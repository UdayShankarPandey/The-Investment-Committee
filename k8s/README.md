# Kubernetes Manifests — The Investment Committee (Sprint 5)

This directory contains production-ready, declarative Kubernetes manifests and Kustomize bundling for deploying **The Investment Committee** microservices on Amazon Elastic Kubernetes Service (Amazon EKS).

---

## Architecture Overview

```text
                                 [ Ingress / ALB ]
                                         │
                   ┌─────────────────────┴─────────────────────┐
                   │                                           │
         path: / (SPA static)                       path: /api/*, /health, /metrics
                   ▼                                           ▼
          [ frontend Service ]                       [ backend Service ]
             (ClusterIP:8080)                           (ClusterIP:3000)
                   │                                           │
                   ▼                                           ▼
          [ frontend Pods ]                          [ backend Pods ]
      (Nginx Unprivileged:8080)                  (Node.js + Express:3000)
                   │                                           ▲
                   └──── Reverse Proxy (proxy_pass) ───────────┘
```

### 1. Dedicated Namespace (`namespace.yaml`)
- Applications run in the dedicated `investment-committee` namespace.
- Prevents cross-tenant contamination with `kube-system` or default namespaces.

### 2. Service Discovery & Inter-Container Communication
- The frontend Nginx container reverse-proxies `/api/*`, `/health`, and `/metrics` directly to `http://backend:3000`.
- Kubernetes CoreDNS automatically resolves the internal hostname `backend` to the `ClusterIP` of `backend-service.yaml`.
- Zero hardcoded host IPs, loopback interfaces (`127.0.0.1`), or public endpoints between microservices.

### 3. Immutable Release Image Provenance
- Container image tags are locked to the exact 40-character Git commit SHA:
  `719982590258.dkr.ecr.ap-south-1.amazonaws.com/the-investment-committee:c429a73148ccc5a6f7854487e4e22ef10b26f0aa`
- Avoids mutable floating tags (`latest`, `dev`, `prod`).

### 4. Zero-Privilege Security Contexts
- **Frontend Pod:** `runAsNonRoot: true`, `runAsUser: 101` (Nginx unprivileged user), `allowPrivilegeEscalation: false`, all Linux capabilities dropped (`drop: ["ALL"]`).
- **Backend Pod:** `runAsNonRoot: true`, `runAsUser: 1000` (Node user), `allowPrivilegeEscalation: false`, all Linux capabilities dropped (`drop: ["ALL"]`).
- Zero plaintext secrets or AWS credentials mounted inside pods.

### 5. Health Probes & Resource Constraints
- **Readiness Probes:** Verify that containers can serve traffic before adding pod IPs to endpoints.
- **Liveness Probes:** Restart stalled containers automatically.
- **Resource Limits:**
  - Frontend: requests `50m` CPU / `64Mi` memory, limits `200m` CPU / `128Mi` memory.
  - Backend: requests `50m` CPU / `64Mi` memory, limits `250m` CPU / `256Mi` memory.
  - Sized conservatively for single `t3.small` EKS worker node execution.

---

## Manifest Inventory

| File | Resource Kind | Name | Purpose |
| :--- | :--- | :--- | :--- |
| `namespace.yaml` | `Namespace` | `investment-committee` | Workload isolation |
| `configmap.yaml` | `ConfigMap` | `investment-committee-config` | Application environment variables |
| `backend-deployment.yaml` | `Deployment` | `backend` | Replicated Node.js backend microservice |
| `backend-service.yaml` | `Service` | `backend` | Internal `ClusterIP` load balancer (port 3000) |
| `frontend-deployment.yaml` | `Deployment` | `frontend` | Replicated React + Nginx frontend microservice |
| `frontend-service.yaml` | `Service` | `frontend` | Internal `ClusterIP` load balancer (port 8080) |
| `ingress.yaml` | `Ingress` | `investment-committee-ingress` | L7 ingress path routing |
| `kustomization.yaml` | `Kustomization` | — | Bundles all resources with common labels |

---

## Deployment & Verification

```bash
# Preview composed manifests
kubectl kustomize k8s/

# Deploy atomic bundle
kubectl apply -k k8s/

# Monitor rollout status
kubectl rollout status deployment/backend -n investment-committee
kubectl rollout status deployment/frontend -n investment-committee

# Verify pods, services, and ingress
kubectl get all -n investment-committee
kubectl get ingress -n investment-committee

# Verify application endpoints via port-forward
kubectl port-forward svc/frontend 8080:8080 -n investment-committee
curl http://localhost:8080/
curl http://localhost:8080/health
curl http://localhost:8080/api/status
curl http://localhost:8080/metrics
```
