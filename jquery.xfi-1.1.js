(function ($) {
  $.XFI = function (options) {
    var self;

    self = this;

    self.settings = {
      submitButtonFeeback: true,
      debug: false
    };

    $.extend(self.settings, options);

    self.buttonText = "Choose File(s)...";

    self.log = function (message, object) {
      if (typeof console !== "undefined" && console !== null) {
        if (typeof object !== "undefined") {
          console.log("[XFI] " + message + ":");
          console.log(object);
        } else {
          console.log("[XFI] " + message);
        }
      }
    };

    self.generateUIDSegment = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    self.generateUID = function () {
      return (self.generateUIDSegment() + "-" + self.generateUIDSegment());
    };

    self.humanizeFileSize = function (size) {
      var units, i;
      units = ['b', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'YB'];
      i = 0;
      while (size >= 1024) {
        size /= 1024;
        ++i;
      }
      return size.toFixed(1) + ' ' + units[i];
    };

    self.init = function () {
      if (self.settings.debug === true) {
        self.log("Initialized");
      }

      $("form:has(input[type='file'].xfi)").each(function () {
        var $form, $inputs;
        $form = $(this);
        $inputs = $form.find("input[type='file'].xfi");
        self.log("Found " + $inputs.length + " XFI file input(s)", $inputs);
        $inputs.each(function () {
          var $input, inputUID, $proxyInput, $cancel, $fileInfo;

          $input = $(this);

          // Generate an UID for this file input
          inputUID = self.generateUID();

          // Hide the existing file input
          // NOTE: We can't just set display to none
          // because Webkit stops us from proxying
          // events back to the input
          $input.css({
            position: "absolute",
            top: 0,
            left: "-1000em",
            width: 0,
            height: 0,
            visibility: "hidden"
          }).attr("data-xfi", inputUID);

          // Build a proxy file input
          $proxyInput = $("<button>", {
            type: "button",
            "class": "xfi-proxy-input",
            text: self.buttonText
          }).attr("data-xfi", inputUID);

          // Insert the proxy file input into the DOM
          $proxyInput.insertAfter($input);

          $cancel = $("<a>", {
            href: "",
            "class": "xfi-cancel",
            "data-xfi": inputUID,
            text: "Cancel",
            click: function (e) {
              var xfiUID, $input, $proxyInput, $fileInfo;
              xfiUID = $(this).data("xfi");
              // Reset the value for the original input
              $input = $("input[data-xfi='" + xfiUID + "'].xfi");
              $input.val("");
              // Reset the text for the proxy input
              $proxyInput = $("button[data-xfi='" + xfiUID + "']");
              $proxyInput.text(self.buttonText);
              // Clear the file information
              $fileInfo = $("ul[data-xfi='" + xfiUID + "']");
              $fileInfo.empty().hide();
              $(this).hide();
              if (self.settings.submitButtonFeeback) {
                $input.parents("form").unbind(".xfi");
              }
              e.preventDefault();
            }
          });

          $cancel.insertAfter($proxyInput).hide();
          $cancel.before(" ");

          // Build a UL to hold file information
          $fileInfo = $("<ul>", {
            "class": "xfi-file-information-container"
          }).attr("data-xfi", inputUID);

          $fileInfo.insertBefore($proxyInput).hide();

          // Pass click events on the proxy file input
          // back to the orginal file input
          $proxyInput.bind("click", function (e) {
            var $proxyInput, xfiUID, $input;
            $proxyInput = $(this);
            xfiUID = $proxyInput.data("xfi");
            $input = $("input[data-xfi='" + xfiUID + "'].xfi");
            $input.click();

            e.preventDefault();
          });

          // Watch the original file input for changes
          $input.bind("change", function () {
            var $input, $proxyInput, proxyInputText, xfiUID, $fileInfo, files, $cancel;
            $input = $(this);
            xfiUID = $input.data("xfi");
            $proxyInput = $("button[data-xfi='" + xfiUID + "']");
            $fileInfo = $("ul[data-xfi='" + xfiUID + "']");
            $fileInfo.empty().hide();
            $cancel = $("a[data-xfi='" + xfiUID + "'].xfi-cancel");
            $cancel.show();
            files = $input[0].files;
            if (files.length > 0) {
              $(files).each(function () {
                var fileName, fileSize;
                self.log("File chosen", this);
                fileName = this.name;
                fileSize = this.size;
                $("<li>", {
                  "class": "xfi-file-information",
                  html: fileName + " <i>(" + self.humanizeFileSize(fileSize) + ")</i>"
                }).appendTo($fileInfo);
              });

              // Show file information
              $fileInfo.show();
              // Update proxy input
              proxyInputText = (files.length > 1) ? " files" : " file";

              $proxyInput.text(files.length + proxyInputText + " chosen. Change?");

              if (self.settings.submitButtonFeeback) {
                $input.parents("form").bind("submit.xfi", function () {
                  var $form, $xfiInputs, totalFileCount, fileOrFiles;
                  $form = $(this);
                  totalFileCount = 0;
                  $xfiInputs = $form.find("input.xfi");
                  $xfiInputs.each(function () {
                    totalFileCount += this.files.length;
                  });
                  if (totalFileCount > 0) {
                    fileOrFiles = (totalFileCount > 1) ? "files" : "file";

                    $form.find("[type='submit']:last")
                      .val("Uploading " + totalFileCount + " " + fileOrFiles + "... Please wait...")
                      .attr("disabled", "disabled")
                      .addClass("busy");
                  }
                });
              }
            } else {
              if (self.settings.submitButtonFeeback) {
                $input.parents("form").unbind(".xfi");
              }
              $proxyInput.text(self.buttonText);
            }
          });
        });
      });
    };

    self.init();
  };
})(jQuery);
