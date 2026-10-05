# Sprint 6 — Observability Architecture: Prometheus, Grafana, and Kubernetes Metrics

This directory provides the production-grade, least-privilege observability stack for **The Investment Committee** running on Amazon EKS.

---

## 1. Architecture Overview

```text
[ React Frontend ] (Port 8080)
       ↓ (reverse-proxy /api)
[ Express Backend ] (Port 3000) ──> exposes /metrics
       ↑ (scrapes :3000/metrics)
[ Prometheus ] (Port 9090) <──── [ kube-state-metrics ] (Port 8080)
       ↑ (queries :9090)
[ Grafana Dashboard ] (Port 3000) ──> accessed via kubectl port-forward
```

- **Namespace**: `observability` (isolated from application namespace `investment-committee`).
- **Prometheus**: Collects time-series metrics from the backend application `/metrics` endpoint and `kube-state-metrics`.
- **Grafana**: Visualizes metrics through an automatically provisioned dashboard ("The Investment Committee — Production Observability") backed by an internal Prometheus datasource.
- **kube-state-metrics**: Listens to the Kubernetes API server and generates metrics about the state of deployments, pods, and nodes.

---

## 2. Pinned Upstream Image Versions

Strictly non-floating, versioned releases are deployed:

| Component | Pinned Image Reference | Port |
|:---|:---|:---|
| **Prometheus** | `prom/prometheus:v3.15.0` | `9090` |
| **Grafana** | `grafana/grafana:11.2.0` | `3000` |
| **kube-state-metrics** | `registry.k8s.io/kube-state-metrics/kube-state-metrics:v2.13.0` | `8080`, `8081` |

---

## 3. Metrics Collected

1. **Application Request Volume**: `http_requests_total`
2. **Application Request Latency**: `http_request_duration_seconds_bucket`, `http_request_duration_seconds_count`
3. **Application Error Rate**: `http_requests_total{status_code=~"5.."}`
4. **Application CPU Utilization**: `process_cpu_user_seconds_total`
5. **Application Memory (RSS)**: `process_resident_memory_bytes`
6. **Node.js Runtime Info**: `nodejs_version_info`
7. **Pod Status & Readiness**: `kube_pod_status_phase`, `kube_pod_status_ready`
8. **Deployment State**: `kube_deployment_status_replicas_available`, `kube_deployment_spec_replicas`
9. **Target Health**: `up`

---

## 4. Pre-configured Alert Rules

Defined in `prometheus-rules.yaml`:

| Alert Rule | Condition | Duration | Severity |
|:---|:---|:---|:---|
| `BackendDown` | `up{job="backend"} == 0` | `1m` | Critical |
| `HighHTTPErrorRate` | 5xx error rate > 5% over 5m | `2m` | Warning |
| `HighP95Latency` | P95 latency > 1.0s over 5m | `2m` | Warning |
| `DeploymentUnavailable` | desired replicas > available replicas | `2m` | Warning |
| `PodNotReady` | `kube_pod_status_ready{condition="true"} == 0` | `2m` | Warning |

---

## 5. Security & Isolation Model

- **Least Privilege RBAC**: Prometheus and kube-state-metrics use dedicated ServiceAccounts and read-only ClusterRoles. No `cluster-admin` privileges are granted.
- **Unprivileged Runtime**:
  - Prometheus: `runAsNonRoot: true`, `runAsUser: 65534`, `allowPrivilegeEscalation: false`, capabilities `drop: ALL`.
  - Grafana: `runAsNonRoot: true`, `runAsUser: 472`, `allowPrivilegeEscalation: false`, capabilities `drop: ALL`.
  - kube-state-metrics: `runAsNonRoot: true`, `runAsUser: 65534`, `allowPrivilegeEscalation: false`, read-only root filesystem.
- **No Public Cloud Exposure**: All observability services are `ClusterIP`. No AWS ALB, NLB, or NodePort services are created.
- **Ephemeral Storage**: Ephemeral `emptyDir` volumes are used with a 24-hour retention period (`--storage.tsdb.retention.time=24h`), preserving minimal resource footprint on single worker nodes.
- **Admin Password**: Grafana admin credentials are created dynamically via a Kubernetes Secret (`grafana-admin`) and never committed to source control.

---

## 6. Port-Forward Access Commands

During local verification or debugging, access the services via secure local port-forwarding:

```bash
# Access Prometheus UI
kubectl port-forward svc/prometheus 9090:9090 -n observability

# Access Grafana Dashboard
kubectl port-forward svc/grafana 3001:3000 -n observability
```

---

## 7. Deployment & Cleanup Procedures

### Deployment
```bash
# Deploy application first
kubectl apply -k k8s/

# Deploy observability stack
kubectl apply -k k8s/observability/
```

### Teardown
```bash
# Delete observability stack
kubectl delete -k k8s/observability/

# Delete application
kubectl delete -k k8s/
```
