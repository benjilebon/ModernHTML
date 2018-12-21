## ModernHTML

ModernHTML is a framework that allows the user to use custom html tags to make common things in a website (slider, diaporama...)

# Main features

* Use custom pre-built tags and build your website easily
* Create your own tags with a simplified core
* Use attributes to configure how you want a tag to work



# Example: 

To make a diaporama of images, simply add the following code to your website:

```html
<diaporama>
    <img src="1.jpg" alt="">
    <img src="2.jpg" alt="">
</diaporama>
```
ModernHTML will automatically converts the diaporama tags into a working div with images inside

# Usage

**ModernHTML has not be released yet !**

~~Simply import modernhtml.min.js in your website with a `<script>` tag~~

# How to contribute ?

You can create and import your own tags and functionnalities in this framework by using core functionnalities!

**Core documentation will be available soon !**

1. Fork this project
2. Create a .js file in the root directory and link it in the core.js file (`requirejs([yourfile])`) (every single js file will eventually be merged and minified into one for release)
3. Do a Pull Request to merge your file into the project

# Browser Support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| TBD | TBD | TBD | TBD | TBD |


