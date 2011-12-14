# XFI

XFI takes advantage of the features available in HTML5 to provide a better user experience for file inputs using the multiple attribute.

If you're looking for features like drag and drop, asynchronous uploads and progress bars then you might want to try something else.

XFI is a simple a jQuery plugin that can be easily integrated into your existing code.

Project status: **Active**
Current version: **1.1**

- [View a demo](http://alistairholt.co.uk/projects/xfi/demo)
- [Read the documentation](http://alistairholt.co.uk/projects/xfi#documentation)

## What XFI provides

- A consistent interface for file inputs using the multiple attribute across different browsers and platforms that is easily styleable with CSS
- Feedback to the user about selected file(s)
- Feedback to the user about file uploads taking place on form submission (Optional)

## What XFI doesn't provide

- Drag and drop file uploads
- Asynchronous file uploads
- Progress bars
- File type/size validation

## Documentation

Setting up XFI is really simple:

Make sure jQuery is available in your page
Add the XFI script to your page
Set the multiple attribute and add a CSS class of 'xfi' to any file inputs on which you want to enable XFI
Call $.XFI() after the DOM has loaded
XFI only has two configuration options, both of which are optional:

**submitButtonFeeback**
(Boolean) Whether or not to use the form's submit button to provide feedback to the user about file uploads that are taking place on form submission. Defaults to true.

**debug**
(Boolean) Whether or not to put XFI into debug mode. In debug mode XFI will log to the JavaScript console if it is available. Defaults to false.

For example:

    $.XFI({
      submitButtonFeedback: false,
      debug: true
    });

The HTML generated by XFI is easily styleable via CSS.

XFI proxy input markup:

    <button class="xfi-input">Choose file(s)...</button>

File information list markup:

    <ul class="xfi-file-information-container">
      <li class="xfi-file-information">IMG_0001.jpg <i>(560 Kb)</i></li>
    </ul>

And finally, a CSS class of 'busy' will be added to the form's submit button on submission if the submitButtonFeedback option is enabled.

## Browser Support

- Chrome 2+
- Safari 4+
- Firefox 3.6+
- Opera 11+
- Internet Explorer 10 (Developer Preview)

Internet Explorer 6-9 do not currently support the multiple attribute on file inputs, therefore XFI is not supported for Internet Explorer. Any XFI file inputs will fallback to being normal file input fields.

## Downloads

Current version - 1.1

- [Production](https://github.com/downloads/alistairholt/XFI/jquery.xfi-1.0.min.js.gz) (Minified and Gzipped - 4 Kb)
- [Development](https://github.com/downloads/alistairholt/XFI/jquery.xfi-1.0.js) (8 Kb)


## License

XFI is licensed under a MIT License (See MIT-LICENSE.txt).

## Feedback

Feel free to tweet me any feedback on [@alistairholt](http://twitter.com/alistairholt).

## Contributions

Got a bug fix or something to add? Fork and send me a pull request on [GitHub](http://github.com/alistairholt/XFI).

If you just want to report an issue you've experience, [create one on GitHub](https://github.com/alistairholt/XFI/issues).