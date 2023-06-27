// Post To Webhook
function postError(genTimestamp, thisForm, thisFile) {
  let payload = JSON.stringify({
    'content': 'Failed to retrieve file.\n',
    'embeds' : [
      {
        'description' : '**' + thisForm.uploaderName + '** has uploaded a file but file not found upon attempting to rename.',
        'fields': [
          {
            'name': thisFile.getName(),
            'value': 'File Type: `' + thisFile.getContentType() + '`\nClassified Under: ' + thisForm.filter + ' / ' + thisForm.tag + '\nFile URL: ' + thisFile.getUrl(),
            'inline': false
          },
          {'name': '',　'value': '',　'inline': false},
        ],
        'timestamp' : genTimestamp
      }
    ]
  });
  Logger.log(payload);
  
  let params = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    'method': 'POST',
    'payload': payload,
    'muteHttpExceptions' : true,
  };

  return params;
}

function postAsRAW(genTimestamp, thisForm, thisFile) {
  let payload = JSON.stringify({
    'content': 'New File Received.',
    'embeds' : [
      {
        'description' : '**' + thisForm.uploaderName + '** has uploaded a file.',
        'fields': [
          {
            'name': thisFile.getName(),
            'value': 'File Type: `' + thisFile.getMimeType() + '`\nFolder Path: ' + thisForm.filter + ' / ' + thisForm.tag + '\nFile URL: ' + thisFile.getUrl(),
            'inline': false
          },
          {'name': '',　'value': '',　'inline': false},
        ],
        'timestamp' : genTimestamp
      }
    ]
  });
  Logger.log(payload);
  
  let params = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    'method': 'POST',
    'payload': payload,
    'muteHttpExceptions' : true,
  };

  return params;
}

function postAsJA(genTimestamp, thisForm, thisFile) {
  let payload = JSON.stringify({
    'content': '新しいファイルが検出されました。',
    'embeds' : [
      {
        'description' : '**' + thisForm.uploaderName + '** が新しいファイルをアップロードしました。',
        'fields': [
          {
            'name': thisFile.getName(),
            'value': 'データ形式: `' + thisFile.getMimeType() + '`\nフォルダーパス: ' + toJA(thisForm.filter) + ' / ' + toJA(thisForm.tag) + '\nＵＲＬ: ' + thisFile.getUrl(),
            'inline': false
          },
          {'name': '',　'value': '',　'inline': false},
        ],
        'timestamp' : genTimestamp
      }
    ]
  });
  Logger.log(payload);
  
  let params = {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    'method': 'POST',
    'payload': payload,
    'muteHttpExceptions' : true,
  };

  return params;
}

function toJA(value) {
  if (value == "Others") {
    return "その他";
  }
  else if (value == "Concept") {
    return "コンセプト";
  }
  else if (value == "Protagonist") {
    return "主人公";
  }
  else if (value == "Antagonist") {
    return "敵";
  }
  else if (value == "Environment") {
    return "環境";
  }
  else if (value == "Texture") {
    return "テクスチャ";
  }
  else if (value == "Model") {
    return "モデル";
  }
  else if (value == "Animation") {
    return "アニメーション";
  }
  else if (value == "Asset") {
    return "アセット";
  }
  else if (value == "Material") {
    return "マテリアル";
  }
  else if (value == "System") {
    return "シーン";
  }
  else if (value == "Player") {
    return "プレイヤー";
  }
  else if (value == "Boss") {
    return "ボス";
  }
  else if (value == "Stage") {
    return "ステージ";
  }
  else {
    return value;
  }
}