pipeline {
  agent { docker { image 'node:10' } }
  environment { HOME='.' }
  stages {
    stage('install') {
      steps {
        sh 'npm install'
      }
    }
    stage('build') {
      steps {
        sh 'npm run task -- build'
      }
    }
    stage('test') {
      steps {
        sh 'echo "No tests available"'
      }
    }
    stage('deploy:dev') {
      when { branch 'release/dev' }
      steps {
        sshagent ( ['aws']) {
          sh 'npm run task -- deploy:dev'
        }
      }
    }
    stage('deploy:uat') {
      when { branch 'release/uat' }
      steps {
        sshagent ( ['aws']) {
          sh 'npm run task -- deploy:uat'
        }
      }
    }
  }
  post { 
    always { 
      script {
        currentBuild.result = currentBuild.result ?: 'SUCCESS'
        notifyBitbucket()
      }
    }
  }
}