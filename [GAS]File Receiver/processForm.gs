function processForm(thisForm) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10 * 1000);                 // process form one by one

  Logger.log(thisForm.uploaderName + ' is attempting to upload a ' + thisForm.assetType + ' file.');
  
  if (thisForm.fileName != '') {
    let genTimestamp = new Date();
    var fileBlob = thisForm.fileToUpload;
  
    Logger.log('New File detected.\n　File Name: ' + fileBlob.getName() + '\n　File Type: ' + fileBlob.getContentType());

    var destFolder = DriveApp.getFolderById(RECEIVER_FOLDER);
    destFolder.createFile(fileBlob);

    Utilities.sleep(10 * 1000);

    if (destFolder.getFilesByName(fileBlob.getName()).hasNext()) {
      var thisFile = destFolder.getFilesByName(fileBlob.getName()).next();
      let newFileName = thisForm.fileName;

      if (newFileName.includes('.')) {
        thisFile.setName(thisForm.fileName);
      }
      else {
        Logger.log('File extension not detected in new filename: ' + thisForm.fileName);
        let fileExt = thisFile.getName().slice(thisFile.getName().indexOf('.'));
        thisFile.setName(newFileName.concat(fileExt));
        Logger.log('Successfully appended file extension to new filename.');
      }

      Logger.log('Renamed to:\n　New Filename: ' + thisFile.getName() + '\n　File Url: ' + thisFile.getUrl());

      if (thisForm.assetType == 'graphics') {
        Logger.log('Graphic asset [' + thisFile.getName() + '] received.');
        manageGraphicAsset(thisFile, thisForm);
      }
      else if (thisForm.assetType == 'sound') {
        Logger.log('Sound asset [' + thisFile.getName() + '] received.');
        manageSoundAsset(thisFile, thisForm);
      }

      let directParentFldr = DriveApp.getFileById(thisFile.getId()).getParents().next();
      Logger.log('Uploaded To: ... / ' + directParentFldr.getParents().next() + ' / ' + directParentFldr);

      let aryData = [
        [genTimestamp, thisForm.assetType, thisFile.getMimeType(), thisFile.getName(), thisFile.getUrl(), thisForm.uploaderName, thisForm.uploaderComment, thisForm.filter, thisForm.tag]
      ];
      Logger.log(aryData);

      SpreadsheetApp.openById(DATABASE_ID).getSheetByName('Asset Log')
        .insertRowBefore(2)
        .getRange(2, 1, 1, 9).setValues(aryData);

      UrlFetchApp.fetch(WEBHOOK_ADMIN, postAsRAW(genTimestamp, thisForm, thisFile));	// 開発者Webhook
      UrlFetchApp.fetch(WEBHOOK_ENDUSER, postAsJA(genTimestamp, thisForm, thisFile));	// ユーザーのWebhook
    }
    else {
      Logger.log('File Error.');
      UrlFetchApp.fetch(WEBHOOK_ADMIN, postError(genTimestamp, thisForm, fileBlob));
    }
    
    return true;
  }
  else {
    Logger.log('No file detected.');
  }

  lock.releaseLock();
}