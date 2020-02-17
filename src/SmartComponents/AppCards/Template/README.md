# Template Card Component

## Template Card (wrapper)

Wraps the entire component, similar to `<Card>`

### Template Card Props

```js
TemplateCard.propTypes = {
    appName: propTypes.string,
    children: propTypes.any
};
```

### Template Card Usage

```js
<TemplateCard appName='SampleApp'>
    { content }
</TemplateCard>
```

## Template Card Header

Provides the header for the card, allows for report download

### Template Card Header Props

```js
TemplateCardHeader.propTypes = {
    title: propTypes.string,
    children: propTypes.any,
    onDownload: propTypes.func
};
```

### Template Card Header Usage

```js
<TemplateCard appName='SampleApp'>
    <TemplateCardHeader title='Sample App' onDownload={ () => console.log('here') }/>
</TemplateCard>
```

You can also declare your own layout

```js
<TemplateCard appName='SampleApp'>
    <TemplateCardHeader onDownload={ () => console.log('here') }>
        { Content }
    </TemplateCardHeader>
</TemplateCard>
```

## Template Card Body

Provides the body for the card

### Template Card Body Props

```js
TemplateCardBody.propTypes = {
    children: propTypes.any
};
```

### Template Card Body Usage

```js
<TemplateCard appName='SampleApp'>
    <TemplateCardBody> { content } </TemplateCardBody>
</TemplateCard>
```

## Template Card Footer

Provides the footer for the card

### Template Card Footer Props

```js
TemplateCardFooter.propTypes = {
    children: propTypes.any
};
```

### Template Card Footer Usage

```js
<TemplateCard appName='SampleApp'>
    <TemplateCardFooter> { content } </TemplateCardFooter>
</TemplateCard>
```
