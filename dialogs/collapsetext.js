/*
 *
 * @file collapsetext.js
 *
 * Dialogue for collapse text icon.
 *
 */

CKEDITOR.dialog.add( 'collapseTextDialog', function( editor ) {
  return {
    title: 'Collapse Text',
    minWidth: 400,
    minHeight: 120,
    contents: [
      {
        id: 'tab-basic',
        elements: [
          {
            type: 'text',
            id: 'title',
            label: 'Title',
            maxLength: 45,
            validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." ),
             setup: function( element, preview ) {
              this.preview_button = preview;
              this.setValue( element.getText() );
            },
            commit: function( element ) {
              element.setText( this.getValue().replace(/(<([^>]+)>)/ig,'') );
            },
          },
          {
            type : 'html',
            html : '<a id="preview-button" type="button" class="btn btn-default"></a>',
            setup: function( element ) {
              var document = this.getElement().getDocument();
              var preview_button = document.getById( 'preview-button' );
              preview_button.setAttribute( "style", "display:none");
            }
          }
        ]
      }
    ],

    onOk: function() {

      var dialog = this;

      var title = dialog.getValueOf( 'tab-basic', 'title' );

      var openTag = '[collapsed title=' + title + ']';
      var closeTag = '[/collapsed]';
      var inplaceTag = ' ' + openTag + ' text ' + closeTag + ' ';

      var S = editor.getSelection();

      if( S == null)
      {
        editor.insertHtml(inplaceTag);
        return;
      }

      var R = S.getRanges();
      R = R[0];

      if( R == null)
      {
        editor.insertHtml(inplaceTag);
        return;
      }


      var startPos = Math.min(R.startOffset, R.endOffset);
      var endPos = Math.max(R.startOffset, R.endOffset);

      if( startPos == endPos )
      {
        editor.insertHtml(inplaceTag);
        return;
      }

      var container = new CKEDITOR.dom.element('p');
      var fragment = R.extractContents();

      container.appendText(openTag);
      fragment.appendTo(container);
      container.appendText(closeTag);

      editor.insertElement(container);
    }
  };
});
