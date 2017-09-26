## IMPORTANT ##
The appui folder can not be removed or renamed.
This is because the framework internally uses the appui/layouts path into each
 device configuration file.
 
 If you want to rename it you must replace the /appui/ for the desired name into the inde.js node file
 i.e
 device_configuration = device_configuration.replace('appui/layouts','layouts');
 // this will allow you to set all the layouts into the layouts folder.