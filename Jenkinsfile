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
npm run test:unit
npm run test:e2e --headless'''
      }
    }

    stage('npm publish') {
      agent {
        docker {
          image 'node:14.8.0-alpine3.12'
        }

      }
      steps {
        sh '''versionOnline=$(npm view @hhm1999/x-components version)
versionLocal=`node -p "require(\'./package.json\').version"`
if [ "$versionOnline" != "$versionLocal" ]; then
npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install
npm run build-components
cnpm install -g npm-cli-login
NPM_USER=${NPM_USER} NPM_PASS=${NPM_PASS} NPM_EMAIL=${NPM_EMAIL} npm-cli-login
npm publish --access public
fi'''
      }
    }

    stage('docs-registry') {
      agent any
      steps {
        sh 'docker login -u hi34219838@aliyun.com -p ${ALI_YUN_repositories_password} registry.cn-shenzhen.aliyuncs.com/x-components/docs'
        sh 'docker build -t registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER .'
        sh 'docker push registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'
      }
    }

    stage('docs-deploy') {
      agent any
      steps {
        sh '''docker rmi -f  `docker images | grep \'x-components\' | awk \'{print $3}\'` || true 
docker rm -f xComponentsDocs || true
docker run -d --name=xComponentsDocs --network host registry.cn-shenzhen.aliyuncs.com/x-components/docs:$BUILD_NUMBER'''
      }
    }

  }
}