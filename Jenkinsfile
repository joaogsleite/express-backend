pipeline {
  agent { docker { image 'node:10' } }
  environment { 
    HOME='.'
    SSH_DEPLOY_DEV = 'username1@hostname1:path1/'
    SSH_KEY_DEV = credentials('aws-ssh-key')
    SSH_DEPLOY_UAT = 'username2@hostname2:path2/'
    SSH_KEY_UAT = credentials('aws-ssh-key')
  }
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
        sh 'npm run task -- deploy dev'
      }
    }
    stage('deploy:uat') {
      when { branch 'release/uat' }
      steps {
        sh 'npm run task -- deploy uat'
      }
    }
  }
}