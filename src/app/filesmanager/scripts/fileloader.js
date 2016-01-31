/**
* @class   FileLoader
* @extends JSClass
*/
var FileLoader = JSClass(
{
    // Files workers
    workers: {
        stl: 'src/app/filesmanager/workers/stl.js',
        obj: false
    },

    // Events callbacks
    onStart   : function(data) {},
    onProgress: function(data) {},
    onEnd     : function(data) {},
    onFace    : function(face) {},

    /**
    * Class constructor.
    *
    * @constructor
    * @param {File} file
    */
    create: function(file) {
        // set file
        this.file = file;

        // file extension as type (all lowecase)
        this.type = file.name.split('.').pop().toLowerCase();
    },

    /**
    * Load the file.
    *
    * @method load
    */
    load: function() {
        // self alias
        var self = this;

        // trigger start check event
        self.onStart({ action: 'check' });

        // if empty file
        if (self.file.size == 0) {
            return self.onEnd({ action: 'check', error: 'emptyFile' });
        }

        // if disabled or unknown type
        if (! self.workers[self.type]) {
            return self.onEnd({
                action: 'check',
                error : self.workers[self.type] === undefined
                      ? 'unknownType'
                      : 'disabledType'
            });
        }

        // trigger end check event
        self.onEnd({ action: 'check' });

        // create the parser instance
        var parser = new Worker(self.workers[self.type]);

        parser.onmessage = function(e) {
            if (e.data.type === 'start') {
                self.onStart(e.data.data);
            }
            else if (e.data.type === 'progress') {
                self.onProgress(e.data.data);
            }
            else if (e.data.type === 'face') {
                self.onFace(e.data.data);
            }
            else if (e.data.type === 'error' || e.data.type === 'end') {
                self.onEnd(e.data.data);
            }
        };

        // create file reader instance
        var reader      = new FileReader();
        var lastPercent = 0;

        reader.onprogress = function(e) {
            if (! e.lengthComputable) {
                return null;
            }
            var percent = Math.round(e.loaded / e.total * 100);
            if (lastPercent !== percent) {
                self.onProgress({
                    action : 'read',
                    total  : e.total,
                    loaded : e.loaded,
                    percent: percent
                });
            }
            lastPercent = percent;
        };

        reader.onloadend = function(e) {
            if (e.target.error) {
                return self.onEnd({ action: 'read', error: e.target.error });
            }
            self.onEnd({ action: 'read' });
            self.onStart({ action: 'parse' });
            parser.postMessage(e.target.result);
        };

        // trigger start read event
        self.onStart({ action: 'read' });

        // read file contents as buffer array
        reader.readAsArrayBuffer(self.file);
    }
});