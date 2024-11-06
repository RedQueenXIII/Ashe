pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "usuario/todoapp" // nome_repositório Docker
        DOCKER_CREDENTIALS = 'dockerhub' // ID das credenciais Docker no Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona o repositório
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Constrói a imagem Docker
                    docker.build("${DOCKER_IMAGE}:${env.BUILD_ID}")
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Roda os testes usando Docker
                sh 'docker run --rm ${DOCKER_IMAGE}:${env.BUILD_ID} npm test'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('', DOCKER_CREDENTIALS) {
                        // Faz o push da imagem para o Docker Hub
                        docker.image("${DOCKER_IMAGE}:${env.BUILD_ID}").push()
                    }
                }
            }
        }
    }

    post {
        always {
            // Remove imagens Docker para liberar espaço
            sh 'docker rmi ${DOCKER_IMAGE}:${env.BUILD_ID} || true'
        }
        failure {
            // Notifica em caso de falha
            echo 'Build falhou.'
        }
    }
}
