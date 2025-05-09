pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'myapp-blue-green'
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBE_CONFIG = credentials('kubeconfig')
        AWS_CREDENTIALS = credentials('aws-credentials')
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                dir('app') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Docker Build') {
            steps {
                dir('app') {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'us-west-2') {
                    sh "aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com"
                    sh "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/${DOCKER_IMAGE}:${DOCKER_TAG}"
                    sh "docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/${DOCKER_IMAGE}:${DOCKER_TAG}"
                }
            }
        }
        
        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Determine which environment to deploy to
                    def currentEnv = sh(script: "kubectl get service myapp-service -o jsonpath='{.spec.selector.environment}'", returnStdout: true).trim()
                    def newEnv = currentEnv == 'blue' ? 'green' : 'blue'
                    
                    // Update the deployment for the new environment
                    sh "kubectl set image deployment/myapp-${newEnv} myapp=${AWS_ACCOUNT_ID}.dkr.ecr.us-west-2.amazonaws.com/${DOCKER_IMAGE}:${DOCKER_TAG}"
                    
                    // Wait for the new deployment to be ready
                    sh "kubectl rollout status deployment/myapp-${newEnv}"
                    
                    // Switch traffic to the new environment
                    sh "kubectl patch service myapp-service -p '{\"spec\":{\"selector\":{\"environment\":\"${newEnv}\"}}}'"
                    
                    // Wait for the service to update
                    sleep 30
                    
                    // Verify the deployment
                    sh "kubectl get pods -l app=myapp,environment=${newEnv}"
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
        success {
            echo 'Deployment completed successfully!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
} 