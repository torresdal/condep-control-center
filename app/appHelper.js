'use strict';

module.exports = {
  getApplication: function(apps, appId){
    for (var index = 0; index < apps.length; ++index) {
       if(apps[index].id===appId){
          return apps[index];
       }
    }
    return null;
  }
};
