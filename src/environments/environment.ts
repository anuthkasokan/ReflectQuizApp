// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  auth:{
    clientId:'5ad37ea5-ce50-4e8f-a178-8a05f57cb4cd',
    authority: 'https://login.microsoftonline.com/cea101fb-acfa-4ba2-90e9-5a83909297e7',
    redirectUri: 'https://cognizantreflectui.com',
    
  }

};
