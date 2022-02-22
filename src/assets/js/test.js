
import {reactive, toRefs} from 'vue'
// import {a} from './t1'
export const refB = ()=>{
    const b = reactive({c:1})
    return toRefs(b)
}
export const { c } = refB() // ref(1)
export const b = reactive({c:1})
export const aa =()=>{console.log("a")}
export const plus = (a) =>{ 
    a()
    c.value++ 
    console.log(c)
}
