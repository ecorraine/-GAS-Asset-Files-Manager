// search by file name of asset and auto input in sheet
// 命名規則を従って、ファイルを検出し、仕様書に入力する
function updateAssets() {
  var dbAssetList = SpreadsheetApp.openById(DATABASE_ID).getSheetByName('Asset Log');

  for (let i = 0; i < SpreadsheetApp.getActiveSheet().getLastRow() + 1; i++) {
    let thisCell = SpreadsheetApp.getActiveSheet().getRange(7 + i, 12);
    let nameToFind = thisCell.getValue().toString();
    
    if (!thisCell.isBlank()) {
      for (let j = 0; j < dbAssetList.getLastRow() + 1; j++) {
        let thisFileName = dbAssetList.getRange(2 + j, 4).getValue().toString();
        let nameToComp = thisFileName.substring(0, thisFileName.indexOf('.'));

        if (nameToComp.match(nameToFind)) {
          console.log(nameToFind + ' : ' + nameToComp);

          let datas = dbAssetList.getRange(2 + j, 5, 1, 3).getValues();

          let thisData = [
            [datas[0][1], datas[0][0], datas[0][2]]
          ];
          console.log(thisData);
          SpreadsheetApp.getActiveSheet().getRange(7 + i, 16, 1, 3).setValues(thisData);
        }
      }
    }
  }
}