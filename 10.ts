type StreetSuffixTester<T,P extends string> = T extends `${string}${P}` ? true: false;
