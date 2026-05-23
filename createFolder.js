function createFolder() {
  // Google Drive上にフォルダを作成
  const folder = DriveApp.createFolder('gasのテスト用フォルダ');

  // 作成したフォルダIDをログ出力
  console.log(folder.getId());
}
