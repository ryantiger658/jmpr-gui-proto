const fs = require('fs')

class jmprClient {
  constructor(path) {
    this.path = path
    this.execPath = this.path + '/bin/jmpr';
    this.install()
    this.version = this.get_version()
    
  }

  install() {
    if(!fs.existsSync(this.execPath)) {
      console.log("jmpr does not exist... installing")
      const execSync = require("child_process").execSync;

      let install_command = 'python3 -m pip install -t ' + this.path + ' jmpr==0.3.1'

      var execResult = execSync(install_command).toString();
    
      console.log("Jmpr installed at " + this.execPath);

    } else {
      console.log("Jmpr is already installed at " + this.execPath)
    }
  }

  set_version() {
    var versionStr = this.execute('-v')
    this.version = versionStr.split(" = ").pop()
  }

  get_version() {
    if(!this.version) {
      this.set_version()
    }

    return this.version
  }

  execute(passed_args=[]) {
      var execSync = require("child_process").execSync;
      var execArgs
      var execResult
      
      if (typeof passed_args === 'string' || passed_args instanceof String) {
        execArgs = [passed_args]
      } else {
        execArgs = passed_args
      }
      
      var execResult = execSync('python3 ' + this.execPath + ' ' + execArgs.join(' ')).toString(); 

      return(execResult)
  }

}

module.exports = jmprClient