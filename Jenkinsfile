pipeline {
  agent any
  stages {
    stage('registry') {
      agent any
      steps {
        sh 'docker login -u hi34219838@aliyun.com -p ${ALI_YUN_repositories_password} registry.cn-shenzhen.aliyuncs.com/x-components/docs'
        sh 'docker build -t registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER .'
        sh 'docker push registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'
        sh 'docker rmi -f  `docker images | grep \'x-components\' | awk \'{print $3}\'` || true '
      }
    }

    stage('deploy') {
      agent any
      steps {
        sh '''docker rm -f xComponentsDocs || true
docker run -d --name=xComponentsDocs --network host registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'''
      }
    }

    stage('test') {
      steps {
        sh '''npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
npm run test:unit'''
      }
    }

  }
}