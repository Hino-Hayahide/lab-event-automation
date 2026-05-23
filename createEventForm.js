function createCelebrationEventForm(){
  const guestname = 'お祝いする方の名前';
  const date = '開催予定日(〇月〇日、数字は半角)';
  //1：フォームを作成し、編集するためにそのフォームにアクセスするための情報（リモコン）を戻り値として吐き出す。そのリモコンを関数formに代入する。
  const formName = guestname +'さんの祝賀会について'
  const form = FormApp.create(formName);
  //2：関数formの値からフォームの編集者権限にアクセスし、説明文を追加する。
  form.setDescription(date + 'に' + guestname + 'さんの祝賀会をします。人数確認のためご協力よろしくお願いします。');
  //3：自由記述式の設問を追加
  form.addTextItem()
      .setTitle('あなたのお名前を教えてください')
      .setRequired(true);
  //4：ボタン式設問を追加
  form.addListItem()
      .setTitle('あなたの役職を教えてください')
      .setChoiceValues(['B4','M1','M2','D1','D2','D3','ポスドク研究員','教員'])
      .setRequired(true);
  //5：ラジオ式設問を追加
  form.addMultipleChoiceItem()
      .setTitle('参加しますか？')
      .setChoiceValues(['参加する','参加しない'])
      .showOtherOption(true)
      .setRequired(true);
  //6：自由記述式の設問を追加
  form.addTextItem()
      .setTitle('好き嫌い、アレルギー等があれば書いてください。')
      .setRequired(false);
  //7：編集者用URLを取得
  const editUrl = form.getEditUrl();
  //8：回答者用URLを取得
  const publishedUrl = form.getPublishedUrl();
  //9：編集者用URLを表示
  console.log('編集者用URL');
  console.log(editUrl);
  //10：回答者用URLを表示
  console.log('回答者用URL');
  console.log(publishedUrl);
  //11：フォームIDを表示
  console.log('フォームのID')
  console.log(form.getId());
  //12：フォームをドライブ上の特定のフォルダの中に移動する。
  const formFile = DriveApp.getFileById(form.getId());
  const folderId = 'YOUR_FOLDER_ID';
  const folder = DriveApp.getFolderById(folderId);
  formFile.moveTo(folder);
  console.log('フォームをフォルダー[gasのテスト用フォルダ]に移動しました。');
  //13：
  const ss = SpreadsheetApp.create(formName + '_回答専用シート');
  const ssId = ss.getId();
  form.setDestination(FormApp.DestinationType,ssId);
  const ssFile = DriveApp.getFileById(ssId);
  ssFile.moveTo(folder);
  console.log('スプレッドシートをフォルダー[gasのテスト用フォルダ]に移動しました。');
  //あとは、フォームのID、編集用URL、回答用URL、スプレッドシートのID、スプレッドシートのURLを一つのドキュメントに書き込んで出力する方法を見ていく。
  const doc = DocumentApp.create(formName + '管理資料');
  const body = doc.getBody();
  body.appendParagraph('フォーム管理資料')
      .setHeading(DocumentApp.ParagraphHeading.HEADING1);
  body.appendParagraph('フォーム名：「' + formName + '」')
      .setHeading(DocumentApp.ParagraphHeading.HEADING2);
  body.appendParagraph('フォーム編集用URL：'+ editUrl)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  body.appendParagraph('フォーム回答者用URL：'+ publishedUrl)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  body.appendParagraph('フォームID：'+ form.getId())
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  const url_sheet = ss.getUrl()
  body.appendParagraph('回答専用フォームURL：'+ url_sheet)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  body.appendParagraph('回答専用フォームID：'+ ssId)
      .setHeading(DocumentApp.ParagraphHeading.HEADING3);
  //
  const docFile = DriveApp.getFileById(doc.getId());
  docFile.moveTo(folder);
  console.log('ドキュメントをフォルダー[gasのテスト用フォルダ]に移動しました。');
}
