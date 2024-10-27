# `really-useful-box-finder`

Finds the maximum size [Really Useful Box](https://www.reallyusefulproducts.co.uk/uk/html/boxdetails.php) to fit a given space.

## Usage

```sh
npm install
node index.js <length> <width> <depth>
```

Length, width depth are in mm. Per the Really Useful Box site, the length is
front-to-back and depth is top-to-bottom.

## Example

```sh
node index.js 250 350 350
3 litre Really Useful Box: 245x180x160
```
