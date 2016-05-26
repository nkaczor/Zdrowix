let nav = function(id){

  return {
    doctor: [ {
      header: 'Main',
      elements: [ {
        label: 'Home',
        path: '/panel/home',
        icon: require('../../assets/icons/home.svg')
      }, {
        label: 'My Page',
        path: `/panel/doctor/${ id }`,
        icon: require('../../assets/icons/profile.svg')
      } ]
    }, {
      header: 'Tools',
      elements: [ {
        label: 'Find Doctor',
        path: '/panel/find-doctor',
        icon: require('../../assets/icons/find.svg')
      }, {
        label: 'Visits',
        path: '/panel/visits',
        icon: require('../../assets/icons/enroll.svg')
      } ]
    }, {
      header: 'Configuration',
      elements: [ {
        label: 'Work Schedule',
        path: '/panel/work-schedule',
        icon: require('../../assets/icons/work-schedule.svg')
      }, {
        label: 'Account Settings',
        path: '/panel/settings',
        icon: require('../../assets/icons/cogwheel.svg')
      } ]
    } ],
    patient: [ {
      header: 'Main',
      elements: [ {
        label: 'Home',
        path: '/panel/home',
        icon: require('../../assets/icons/home.svg')
      } ]
    }, {
      header: 'Tools',
      elements: [ {
        label: 'Find Doctor',
        path: '/panel/find-doctor',
        icon: require('../../assets/icons/find.svg')
      }, {
        label: 'Visits',
        path: '/panel/visits',
        icon: require('../../assets/icons/enroll.svg')
      } ]
    }, {
      header: 'Configuration',
      elements: [ {
        label: 'Account Settings',
        path: '/panel/settings',
        icon: require('../../assets/icons/cogwheel.svg')
      } ]
    } ]
  };
};

export default nav;