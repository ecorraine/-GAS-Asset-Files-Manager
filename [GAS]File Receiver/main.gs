function doGet(e) {
  var logSheet = SpreadsheetApp.openById(DATABASE_ID);
  let thisUser = Session.getActiveUser().getEmail();
  var isDesigner = DriveApp.getFolderById(DESIGNERS_ROOT).getAccess(thisUser);
  var isComposer = DriveApp.getFolderById(COMPOSERS_ROOT).getAccess(thisUser);

  if (isDesigner == 'EDIT' || isDesigner == 'OWNER'|| isComposer == 'EDIT' || isComposer == 'OWNER') {
    let foundUser = 0;
  
    for (let row = 2; foundUser == 0; row++) {
      if (thisUser == logSheet.getSheetByName('User List').getRange(row, 1).getValue()) {
        Logger.log('USER FOUND: '+ logSheet.getSheetByName('User List').getRange(row, 1).getValue());
        foundUser = logSheet.getSheetByName('User List').getRange(row, 2).getValue();
      }
    }
    
    var thisAsset = 0;
    if (isDesigner == 'EDIT' || isDesigner == 'OWNER') {
      Logger.log('Access approved as [DESIGNER] for ' + Session.getActiveUser().getEmail() + '.');
      thisAsset = "graphics";
    }
    else if (isComposer == 'EDIT' || isComposer == 'OWNER') {
      Logger.log('Access approved as [COMPOSER] for ' + Session.getActiveUser().getEmail() + '.');
      thisAsset = "sound";
    }

    var html = HtmlService.createTemplateFromFile('UploadForm');
    html.thisAsset = thisAsset;
    html.foundUser = foundUser;
    
    return html
      .setTitle('TITLE | タイトル');
      .evaluate()                                                                   // evaluate MUST come before setting the Sandbox mode
  }
  else {
    Logger.log('Access denied for ' + Session.getActiveUser().getEmail() + '.');
    return HtmlService.createHtmlOutput('<div>該当ユーザーはアクセス権限がございません。</div>');
  }
}
