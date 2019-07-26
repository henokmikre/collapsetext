/*
 *
 * @file plugin.js
 *
 * CKEditor plugin for collapse text icon.
 *
 */

CKEDITOR.plugins.add( 'collapsetext', {
  init: function( editor ) {
    editor.addCommand( 'collapsetext', new CKEDITOR.dialogCommand( 'collapseTextDialog' ) );
    editor.ui.addButton( 'collapsetext', {
      label: 'Collapse Text',
      command: 'collapsetext',
      icon: this.path + 'images/collapsetext.png'
    });

    CKEDITOR.dialog.add( 'collapseTextDialog', this.path + 'dialogs/collapsetext.js' );
  }
});
