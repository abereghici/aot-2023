type Reverse<T extends string> =  
 T extends `${infer P}${infer M}` ?
 `${Reverse<M>}${P}`: T;
