import { Component, Injector, Input, OnDestroy, OnInit, NgZone } from '@angular/core';
import * as grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import 'grapesjs-preset-newsletter';
import { BaseComponent } from '../../common/commonComponent';

@Component({
  selector: 'app-grapes-js',
  templateUrl: './grapes-js.component.html',
  styles: [],
})
export class GrapesJSComponent extends BaseComponent implements OnInit, OnDestroy {
  public _editor: any = {};
  public emailTemplateId: any;
  public blocks: any;
  public fieldList = ['fullname', 'lastname', 'role'];
  public showRichTextEditor: boolean;
  public key;
  public blockManager: any;
  @Input() emailTemplate: any;
  @Input() index: any
  @Input() type: any;
  public plugin: any;
  public plugin2: any;
  @Input() grapesjsId: any;
  public sample: any;
  public colorPicker1: any;
  public panelManager: any;
  constructor(public inj: Injector, public zone: NgZone) {
    super(inj);

  }

  // tslint:disable-next-line: cognitive-complexity
  ngOnInit() {
    setTimeout(() => {
      if (this.emailTemplate && this.type) {
        if (this.type === 'emailDetail' || this.type === 'cmsDetail' || this.type == 'charityDetail' || this.type == 'causeDetail' || this.type == 'typeCommon') {
          this.showRichTextEditor = true;
          this.blocks = ['default', 'Extra', 'forms', 'link-block', 'quote', 'image', 'video', 'text', 'column1', 'column2', 'column3'];
          this.colorPicker1 = { appendTo: 'parent', offset: { top: 26, left: -155 } };
          this.plugin = 'grapesjs-preset-newsletter';
          // this.plugin = 'grapesjs-preset-webpage';
        } else {
          this.showRichTextEditor = false;
          this.blocks = ['image', 'text'];
          this.plugin = 'grapesjs-preset-webpage';
          this.colorPicker1 = { appendTo: 'parent', offset: { top: 26, left: -155 } };
        }
        // this.plugin2 = 'grapesjs-preset-newsletter';

        this._editor[this.grapesjsId] = this.initializeEditor();

        // To hide unwanted blocks in editor
        if (this.type == 'emailDetail' || this.type == 'cmsDetail' || this.type == 'charityDetail' || this.type == 'causeDetail' || this.type == 'typeCommon') {
          this.blockManager = this._editor[this.grapesjsId].BlockManager;
          this.blockManager.remove("sect100");
          this.blockManager.remove("sect50");
          this.blockManager.remove("sect30");
          this.blockManager.remove("sect37");
          this.blockManager.remove("button");
          this.blockManager.remove("divider");
          this.blockManager.remove("link");
          this.blockManager.remove("grid-items");
          this.blockManager.remove("list-items");


        }


        if (this._editor[this.grapesjsId].RichTextEditor.get('insert')) { this._editor[this.grapesjsId].RichTextEditor.remove('insert'); }
        if (this.showRichTextEditor) {
          // Add Custom Richtexteditor for dropdown

          const getNgSelect = document.getElementById('dynamic');
          if (this._editor[this.grapesjsId].RichTextEditor.get('insert')) { this._editor[this.grapesjsId].RichTextEditor.remove('insert'); }

          this._editor[this.grapesjsId].RichTextEditor.add('insert', {
            icon: getNgSelect,
            result: (rte, action) => {
              const data = rte.el.firstChild.ownerDocument;
              if (this.insertValue) {
                data.execCommand('insertText', false, '{{' + this.insertValue + '}}');
                this.insertValue = '';
              }
            },
          });
        }
        if (this.type === 'emailDetail' || this.type == 'cmsDetail' || this.type == 'charityDetail' || this.type == 'causeDetail' || this.type == 'typeCommon') {
          this.panelManager = this._editor[this.grapesjsId].Panels;
          this.panelManager.addButton("options", {
            id: 'undo',
            className: 'fa fa-undo',
            command: e => e.runCommand('core:undo'),
            attributes: { title: 'undo' },
            active: true,
          });
          this.panelManager.addButton("options", {
            id: 'delete',
            className: 'fa fa-trash',
            command: e => {
              let res = window.confirm('Are you sure want to clear the canvas?');
              if (res) {
                e.runCommand('core:canvas-clear')
              }
            },
            attributes: { title: 'Delete' },
            active: true,
          });
          this.panelManager.removeButton('options', 'gjs-toggle-images');
        }

        // Add Custom Richtexteditor for ordered list
        if (this._editor[this.grapesjsId].RichTextEditor.get('orderList')) { this._editor[this.grapesjsId].RichTextEditor.remove('orderList'); }
        this._editor[this.grapesjsId].RichTextEditor.add('orderList',
          {
            icon: '1.',
            attributes: { title: 'Ordered List' },
            result: rte => rte.exec('insertOrderedList')
          }
        );
        // Add Custom Richtexteditor for unordered list
        if (this._editor[this.grapesjsId].RichTextEditor.get('unorderList')) { this._editor[this.grapesjsId].RichTextEditor.remove('unorderList'); }
        this._editor[this.grapesjsId].RichTextEditor.add('unorderList',
          {
            icon: '&#8226;',
            attributes: { title: 'Unordered List' },
            result: rte => rte.exec('insertUnorderedList')
          });

      }
    }, 1000);
  }
  ngDoCheck() {
    if (this._editor[this.grapesjsId] && this.plugin == 'grapesjs-preset-newsletter') {
      this.setToken('gjs-inlined-html', this._editor[this.grapesjsId].runCommand('gjs-get-inlined-html'));
    }
  }
  /*************************************************************/
  // Initialize Grapesjs
  /*************************************************************/
  initializeEditor() {

    // setTimeout(() => {
    return grapesjs.init({
      container: '#' + this.grapesjsId,
      fromElement: false,
      autorender: true,
      forceClass: false,
      colorPicker: this.colorPicker1,
      components: '',
      style: '',
      plugins: [this.plugin],
      pluginsOpts: {
        [this.plugin]: {
          inlineCss: true,
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
          blocksBasicOpts: {
            blocks: this.blocks,
            flexGrid: false,
            stylePrefix: 'lala-',
          },
        },
        // [this.plugin2]: {
        //   inlineCss: true,
        //   blocksBasicOpts: {
        //     blocks: ['sect100', 'sect50', 'sect30', 'text', 'text-sect', 'image', 'quote'],
        //   }
        // }
      },
      assetManager: {
        storageType: '',
        storeOnChange: true,
        storeAfterUpload: true,
        assets: ['http://placehold.it/350x250/78c5d6/fff/image1.jpg'],
        uploadText: 'Add image through link or upload image',
        modalTitle: 'Select Image',
        inputPlaceholder: 'http://url/to/the/image.jpg',
        addBtnText: 'Add image',
        uploadFile: (e) => {

          const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
          const fileUpload = new FormData();
          fileUpload.append('file', file);
          this.commonService.callApi(this.callAPIConstants.AdminFileUpload, fileUpload, 'post', false, true).then((success) => {
            if (success.status === 1) {

              var image = this.imagePath + success.data.filePath
              this._editor[this.grapesjsId].AssetManager.add(image);


            }
          });
        },

      },
      storageManager: {
        id: this.grapesjsId,
        autosave: true,
        setStepsBeforeSave: 1,
        autoload: true,
        type: 'local',
        urlStore: '',
        urlLoad: '',
        contentTypeJson: true,
      },
      handleAdd: (textFromInput) => {
        this._editor[this.grapesjsId].AssetManager.add(textFromInput);
      },
      canvas: {
        styles: [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
          'https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css',
        ],
        scripts: ['https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'],
      },
    });
    // }, 1000);

  }
  /*************************************************************/

  // get value to insert in editor
  public insertValue: any;
  showValue(event) {
    this.insertValue = event;
  }

  ngOnDestroy() {
    // destroy instance of editor
    if (this._editor[this.grapesjsId])
      this._editor[this.grapesjsId].destroy();
  }

}
