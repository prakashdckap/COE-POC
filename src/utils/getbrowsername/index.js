// utils/getBrowserName.js
export function getBrowserName() {
    const userAgent = navigator.userAgent;
  
    if (userAgent.includes('Firefox')) {
      return 'Firefox';
    } else if (userAgent.includes('SamsungBrowser')) {
      return 'Samsung Browser';
    } else if (userAgent.includes('Opera') || userAgent.includes('OPR')) {
      return 'Opera';
    } else if (userAgent.includes('Trident')) {
      return 'Internet Explorer';
    } else if (userAgent.includes('Edge')) {
      return 'Microsoft Edge';
    } else if (userAgent.includes('Chrome')) {
      return 'Chrome';
    } else if (userAgent.includes('Safari')) {
      return 'Safari';
    }
    return 'Unknown Browser';
  }


  export function getDeviceType(availableDevices) {
    const width = window.innerWidth;
    let detectedType = "mobile";
    if (width >= 1024) {
      detectedType = "desktop";
    } else if (width >= 768) {
      detectedType = "tablet";
    }
    if (availableDevices?.includes(detectedType)) {
      return true;
    } else {
      return false;
    }
  }