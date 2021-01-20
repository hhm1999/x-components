pipeline {
  agent any
  stages {
    stage('registry') {
      agent {
        docker {
          image 'node:14.8.0-alpine3.12'
        }

      }
      steps {
        sh 'docker login -u hi34219838@aliyun.com -p ${ALI_YUN_repositories_password} registry.cn-shenzhen.aliyuncs.com/x-components/docs'
        sh 'docker build -t registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER .'
        sh 'docker push registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'
      }
    }

    stage('deploy') {
      steps {
        sh '''ssh -o StrictHostKeyChecking=no root@47.112.165.76
docker rm -f xComponentsDocs || true
docker run -d --name=xComponentsDocs --network host registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'''
      }
    }

  }
}