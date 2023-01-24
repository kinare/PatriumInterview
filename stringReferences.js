const sourceObject = {
    props: {
        read: 'a',
        write: 'b',
        another: {
            one : 'Hi',
            two: 'there'
        }
    }
};

const referenceA = 'props.another.one';

const valueA = propertyAccessor(referenceA, sourceObject);

console.log(valueA)

function propertyAccessor(stringReference, obj){
    let ref = stringReference.split('.')

    ref.forEach( r => {
        obj = obj[r]
    })

    return obj;
}
