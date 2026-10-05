# Operational Runbook: Incident Diagnosis, Rollback, and Recovery Verification

This runbook defines the standard operating procedure (SOP) for detecting, diagnosing, and rolling back bad container releases on Amazon EKS for **The Investment Committee**.

---

## 1. Incident Detection & Failure Signals

When an incompatible or defective container release is deployed:

### Prometheus Alerts
Prometheus continuously monitors service and workload health. The following alerts trigger during deployment failures:
- **`BackendDown`**: `up{job="backend"} == 0` for 1m (Severity: Critical). Triggered when backend endpoints become unreachable or unready.
- **`DeploymentUnavailable`**: Desired replicas > available replicas for 2m (Severity: Warning). Triggered when pods fail readiness checks or enter `CrashLoopBackOff`.
- **`PodNotReady`**: `kube_pod_status_ready == 0` for 2m (Severity: Warning).

### Grafana Dashboard Signals
Access Grafana dashboard via port-forwarding (`kubectl port-forward svc/grafana 3001:3000 -n observability`):
- **Pod Readiness**: Degrades from expected replica count (e.g. drops from 2 to 1).
- **Deployment Availability**: Shows `0` available replicas for the affected workload.
- **Prometheus Target Health**: Target count drops from healthy baseline (4 to 3).
- **Active Alerts**: Shows active firing alerts (`BackendDown`, `DeploymentUnavailable`).
- **HTTP Error Rate**: Spikes with 502/504 Bad Gateway errors from reverse proxy.

---

## 2. Diagnosis: Identifying the Bad Release

To identify the failing deployment and the specific bad image:

```bash
# 1. Check pod statuses in the application namespace
kubectl get pods -n investment-committee -o wide

# 2. Inspect failing pod events and crash logs
kubectl describe pod <pod-name> -n investment-committee
kubectl logs <pod-name> -n investment-committee --previous

# 3. Check deployment revision and currently deployed container image
kubectl get deployment backend -n investment-committee -o jsonpath='{.spec.template.spec.containers[0].image}'

# 4. View deployment rollout history
kubectl rollout history deployment/backend -n investment-committee
```

Common causes:
- Incompatible container image (e.g., frontend Nginx image deployed to backend service).
- Missing configuration or environment variables.
- Application crash on initialization or probe failure.

---

## 3. Rollback Procedure

### Option A: Explicit Rollback to Known-Good ECR Image Tag (Recommended)
Deploy the verified immutable Git SHA image tag directly:

```bash
kubectl set image deployment/backend \
  backend=107585010019.dkr.ecr.ap-south-1.amazonaws.com/the-investment-committee:<KNOWN_GOOD_SHA>-backend \
  -n investment-committee
```

### Option B: Undo to Previous Revision
Roll back to the previous deployment revision:

```bash
kubectl rollout undo deployment/backend -n investment-committee
```

### Monitor Rollback Progress:
```bash
kubectl rollout status deployment/backend -n investment-committee --timeout=180s
```

---

## 4. Verification of Recovery

### 1. Verify Workload Readiness
```bash
kubectl get deployment backend -n investment-committee
kubectl get pods -n investment-committee -l app=backend
```
Ensure pods report `1/1 Running` and `0` restarts.

### 2. Verify Application Endpoints
```bash
# Direct backend check via port-forward
kubectl port-forward svc/backend 3000:3000 -n investment-committee
curl -s http://localhost:3000/health
curl -s http://localhost:3000/api/status
curl -s http://localhost:3000/metrics

# Frontend reverse-proxy check
curl -s http://localhost:8080/health
curl -s http://localhost:8080/api/status
```

### 3. Verify Prometheus Target Health
```bash
# Query Prometheus API
curl -s "http://localhost:9090/api/v1/targets" | jq '.data.activeTargets[] | {job: .labels.job, health: .health}'
```
Confirm `backend` target reports `health: "up"`.

### 4. Verify Grafana Dashboard
- All 9 core panels show active, non-zero data.
- Active alert count returns to `0`.
- Pod readiness returns to `2` (1 frontend + 1 backend).
- Deployment availability returns to `1`.

---

## 5. ECR Image Provenance Verification

To verify that the deployed container image corresponds to a trusted, immutable build:

```bash
# 1. Query ECR for the image digest
aws ecr describe-images \
  --repository-name the-investment-committee \
  --region ap-south-1 \
  --image-ids imageTag=<SHA>-backend \
  --query 'imageDetails[0].[imageTags,imageDigest,imagePushedAt]'

# 2. Match the image revision with the GitHub commit SHA
git log -1 <SHA> --oneline
```
All production deployments must use immutable Git commit SHA tags published by the automated GitHub Actions CI/CD pipeline.
