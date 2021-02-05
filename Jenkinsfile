pipeline {
  agent any
  stages {
    stage('test') {
      agent {
        docker {
          image 'node:14.8.0-alpine3.12'
        }

      }
      steps {
        sh '''npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
npm run test:unit'''
      }
    }

    stage('npm publish') {
      agent {
        docker {
          image 'node:14.8.0-alpine3.12'
        }

      }
      steps {
        sh '''npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
npm run test:unit'''
      }
    }

    stage('docs-registry') {
      agent any
      steps {
        sh 'docker login -u hi34219838@aliyun.com -p ${ALI_YUN_repositories_password} registry.cn-shenzhen.aliyuncs.com/x-components/docs'
        sh 'docker build -t registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER .'
        sh 'docker push registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'
        sh 'docker rmi -f  `docker images | grep \'x-components\' | awk \'{print $3}\'` || true '
      }
    }

    stage('docs-deploy') {
      agent any
      steps {
        sh '''docker rm -f xComponentsDocs || true
docker run -d --name=xComponentsDocs --network host registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'''
      }
    }

  }
}