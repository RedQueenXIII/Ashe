
variable "region" {
  description = "A região onde os recursos serão criados"
  type        = string
  default     = "us-east-1"
}

variable "cluster_name" {
  description = "Nome do cluster ECS"
  type        = string
  default     = "todo-app-cluster"
}

variable "app_name" {
  description = "Nome da aplicação"
  type        = string
  default     = "todo-app"
}

variable "container_port" {
  description = "Porta do contêiner para expor"
  type        = number
  default     = 3000
}
