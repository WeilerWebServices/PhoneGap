// copy all the CSDK files to the correct location
require('shelljs/global');

// Install all the plugins first
echo('Install CSDK plugins');
exec('phonegap plugin add phonegap-plugin-csdk-client-auth --variable CSDK_CLIENT_ID_IOS=4b5502ee68824ce1b3d32650b7ee0e0d --variable CSDK_CLIENT_ID_ANDROID=4b5502ee68824ce1b3d32650b7ee0e0d --variable CSDK_CLIENT_SECRET_IOS=eec88ace-14bb-4769-adc5-71fb836ce525 --variable CSDK_CLIENT_SECRET_ANDROID=eec88ace-14bb-4769-adc5-71fb836ce525');
exec('phonegap plugin add phonegap-plugin-csdk-image-editor');
exec('phonegap plugin add phonegap-plugin-csdk-user-auth');
exec('phonegap plugin add phonegap-plugin-csdk-send-to-desktop');

// Copy the CSDK files to plugins
// phonegap-plugin-csdk-client-auth
/*
cp(
  '-rf',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKCore.framework/Versions/A/Resources/AdobeCreativeSDKCoreResources.bundle',
  'plugins/phonegap-plugin-csdk-client-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKCore.framework/Versions/A/Resources/'
);
*/
mkdir('-p', 'plugins/phonegap-plugin-csdk-client-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKCore.framework');
cp(
  '-rfL',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKCore.framework/*',
  'plugins/phonegap-plugin-csdk-client-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKCore.framework'
);

// phonegap-plugin-csdk-image-editor
/*
cp(
  '-rf',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKImage.framework/Versions/A/Resources/AdobeCreativeSDKImageResources.bundle',
  'plugins/phonegap-plugin-csdk-image-editor/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKImage.framework/Versions/A/Resources'
);
*/
mkdir('-p', 'plugins/phonegap-plugin-csdk-image-editor/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKImage.framework');
cp(
  '-rfL',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKImage.framework/*',
  'plugins/phonegap-plugin-csdk-image-editor/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKImage.framework'
);

// phonegap-plugin-csdk-user-auth
/*
cp(
  '-rf',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKAssetModel.framework/Versions/A/Resources/AdobeCreativeSDKAssetModelResources.bundle',
  'plugins/phonegap-plugin-csdk-user-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKAssetModel.framework/Versions/A/Resources'
);
*/
mkdir('-p', 'plugins/phonegap-plugin-csdk-user-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKAssetModel.framework');
cp(
  '-rfL',
  'AdobeCreativeSDKFrameworks/AdobeCreativeSDKAssetModel.framework/*',
  'plugins/phonegap-plugin-csdk-user-auth/src/ios/AdobeCreativeSDKFrameworks/AdobeCreativeSDKAssetModel.framework'
);

// phonegap-plugin-csdk-send-to-desktop
// nothing extra needed

echo('Add iOS platform');
exec('phonegap platform add ios');

/*
var child = exec('phonegap platform add ios', {async:true});
child.stdout.on('data', function(data) {
  console.log(data);
});
*/
