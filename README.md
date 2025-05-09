# Blue-Green Deployment Demo

This project demonstrates a complete CI/CD pipeline using blue-green deployment strategy on Kubernetes. The infrastructure is provisioned with Terraform, Jenkins is configured with Ansible, and the application is containerized with Docker.

## Project Structure

```
myapp-blue-green-deployment/
├── app/                            # React application
├── k8s/                            # Kubernetes manifests
├── terraform/                      # Infrastructure as Code
├── ansible/                        # Jenkins setup automation
└── Jenkinsfile                     # CI/CD pipeline definition
```

## Prerequisites

- AWS Account with appropriate permissions
- Terraform v1.0.0+
- Ansible v2.9+
- kubectl
- Docker
- Node.js and npm

## Setup Instructions

1. **Infrastructure Setup**
   ```bash
   cd terraform
   terraform init
   terraform apply
   ```

2. **Jenkins Setup**
   ```bash
   cd ansible
   export JENKINS_IP=$(terraform output -raw jenkins_public_ip)
   ansible-playbook -i inventory.ini jenkins_setup.yml
   ```

3. **Kubernetes Configuration**
   ```bash
   aws eks update-kubeconfig --name myapp-cluster --region us-west-2
   kubectl apply -f k8s/
   ```

4. **Jenkins Configuration**
   - Access Jenkins at http://<jenkins-ip>:8080
   - Install required plugins:
     - Pipeline
     - Docker Pipeline
     - Kubernetes
     - AWS
   - Configure credentials:
     - AWS credentials
     - Kubernetes config
     - Docker registry credentials

5. **Application Deployment**
   - Create a new pipeline in Jenkins
   - Point to the repository containing this project
   - The pipeline will automatically handle blue-green deployments

## Blue-Green Deployment Process

1. The pipeline builds and tests the application
2. Creates a new Docker image
3. Deploys to the inactive environment (blue or green)
4. Verifies the new deployment
5. Switches traffic to the new deployment
6. Keeps the old deployment for rollback if needed

## Monitoring and Rollback

- Monitor deployments using `kubectl get pods`
- View logs with `kubectl logs`
- Rollback by switching the service selector back to the previous environment

## Security Considerations

- AWS credentials are stored securely in Jenkins
- Kubernetes secrets are used for sensitive data
- Network policies restrict pod-to-pod communication
- Regular security updates are applied to the infrastructure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 