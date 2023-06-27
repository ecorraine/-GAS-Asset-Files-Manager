function manageGraphicAsset(thisFile, thisForm) {
  // unfiltered
  if (thisForm.filter == 'Others') {
    thisFile.moveTo(DriveApp.getFolderById(DESIGNERS_ROOT));
  }

  // Concept
  else if (thisForm.filter == 'Concept') {
    if (thisForm.tag == 'Protagonist') { thisFile.moveTo(DriveApp.getFolderById(CONCEPT_FLDR).getFoldersByName('主人公').next()); }
    else if (thisForm.tag == 'Antagonist') { thisFile.moveTo(DriveApp.getFolderById(CONCEPT_FLDR).getFoldersByName('敵').next()); }
    else if (thisForm.tag == 'Environment') { thisFile.moveTo(DriveApp.getFolderById(CONCEPT_FLDR).getFoldersByName('環境').next()); }
    else {
        thisFile.moveTo(DriveApp.getFolderById(CONCEPT_FLDR));
        thisForm.tag = 'Others';
      }
  }

  // Assets
  else {
    if (thisForm.filter == '2D') {
      if (thisForm.tag == 'Protagonist') { thisFile.moveTo(DriveApp.getFolderById(ASSET_2D).getFoldersByName('主人公').next()); }
      else if (thisForm.tag == 'Antagonist') { thisFile.moveTo(DriveApp.getFolderById(ASSET_2D).getFoldersByName('敵').next()); }
      else if (thisForm.tag == 'Environment') { thisFile.moveTo(DriveApp.getFolderById(ASSET_2D).getFoldersByName('環境').next()); }
      else {
        thisFile.moveTo(DriveApp.getFolderById(ASSET_2D));
        thisForm.tag = 'Others';
        }
    }

    else if (thisForm.filter == '3D') {
      if (thisForm.tag == 'Protagonist') { thisFile.moveTo(DriveApp.getFolderById(ASSET_3D).getFoldersByName('主人公').next()); }
      else if (thisForm.tag == 'Antagonist') { thisFile.moveTo(DriveApp.getFolderById(ASSET_3D).getFoldersByName('敵').next()); }
      else if (thisForm.tag == 'Environment') { thisFile.moveTo(DriveApp.getFolderById(ASSET_3D).getFoldersByName('環境').next()); }
      else { thisFile.moveTo(DriveApp.getFolderById(ASSET_3D)); }
    }
    
    else if (thisForm.filter == 'UI') {
      if (thisForm.tag == 'Animation') { thisFile.moveTo(DriveApp.getFolderById(ASSET_UI).getFoldersByName('アニメーション').next()); }
      else if (thisForm.tag == 'Texture') { thisFile.moveTo(DriveApp.getFolderById(ASSET_UI).getFoldersByName('テクスチャ').next()); }
      else {
        thisFile.moveTo(DriveApp.getFolderById(ASSET_UI));
        thisForm.tag = 'Others';
        }
    }
    
    else if (thisForm.filter == 'Unreal') {
      if (thisForm.tag == 'Asset') { thisFile.moveTo(DriveApp.getFolderById(ASSET_UNREAL).getFoldersByName('Asset').next()); }
      else if (thisForm.tag == 'Material') { thisFile.moveTo(DriveApp.getFolderById(ASSET_UNREAL).getFoldersByName('Material').next()); }
      else {
        thisFile.moveTo(DriveApp.getFolderById(ASSET_UNREAL));
        thisForm.tag = 'Others';
        }
    }
    
    else if (thisForm.filter == 'VFX') {
      if (thisForm.tag == 'Texture') { thisFile.moveTo(DriveApp.getFolderById(ASSET_VFX).getFoldersByName('テクスチャ').next()); }
      else if (thisForm.tag == 'Model') { thisFile.moveTo(DriveApp.getFolderById(ASSET_VFX).getFoldersByName('モデル').next()); }
      else {
        thisFile.moveTo(DriveApp.getFolderById(ASSET_VFX));
        thisForm.tag = 'Others';
      }
    }
  }
}

function manageSoundAsset(thisFile, thisForm) {
  // unfiltered
  if (thisForm.filter == 'Others') {
    thisFile.moveTo(DriveApp.getFolderById(COMPOSERS_ROOT));
  }

  // BGM
  else if (thisForm.filter == 'BGM') {
    thisFile.moveTo(DriveApp.getFolderById(BGM_FLDR));
    thisForm.tag = '';
  }

  // System
  else if (thisForm.filter == 'System') {
    if (DriveApp.getFolderById(SCENE_FLDR).getFoldersByName(thisForm.tag).hasNext()) {
      thisFile.moveTo(DriveApp.getFolderById(SCENE_FLDR).getFoldersByName(thisForm.tag).next());
    }
    else {
      thisFile.moveTo(DriveApp.getFolderById(SCENE_FLDR));
      thisForm.tag = '';
    }
  }

  // Player
  else if (thisForm.filter == 'Player') {
      thisFile.moveTo(DriveApp.getFolderById(PLAYER_FLDR));
      thisForm.tag = '';
  }

  // Boss
  else if (thisForm.filter == 'Boss') {
    if (DriveApp.getFolderById(BOSS_FLDR).getFoldersByName(thisForm.tag).hasNext()) {
      thisFile.moveTo(DriveApp.getFolderById(BOSS_FLDR).getFoldersByName(thisForm.tag).next());
    }
    else {
      thisFile.moveTo(DriveApp.getFolderById(BOSS_FLDR));
      thisForm.tag = 'Others';
    }
  }

  // Stage
  else if (thisForm.filter == 'Stage') {
    if (DriveApp.getFolderById(STAGE_FLDR).getFoldersByName(thisForm.tag).hasNext()) {
      thisFile.moveTo(DriveApp.getFolderById(STAGE_FLDR).getFoldersByName(thisForm.tag).next());
    }
    else {
      thisFile.moveTo(DriveApp.getFolderById(STAGE_FLDR));
      thisForm.tag = 'Others';
    }
  }
}
