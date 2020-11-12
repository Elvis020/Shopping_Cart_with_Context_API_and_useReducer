

const Reducer = (state,action) => {
    switch(action.type) {
        case 'CLEAR_CART':
            return{
                ...state,
                cart: []
            }
        case 'REMOVE_ITEM':
            return{
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            }
        case 'GET_TOTALS':
            // Using reduce
            let {total,amount} = state.cart.reduce((cartTotal, cartItem) => {
                const {amount,price} = cartItem;
                // For total price
                let itemTotal = price * amount;
                cartTotal.total += itemTotal;
                // For total items
                cartTotal.amount += amount;
                return cartTotal;
            },{
                total:0,
                amount: 0
            })
            total = parseFloat(total.toFixed(2))
            return {...state,total,amount}
        case 'LOADING':
            return{
                ...state,
                loading: true
            }
        case 'DISPLAY_ITEMS':
            return{
                ...state,
                cart: action.payload,
                loading: false
            }
        case 'TOGGLE_AMOUNT':
            let tempCart3 = state.cart.map(cartItems => {
               if(cartItems.id === action.payload.id){
                   if(action.payload.type === 'increase'){
                       return {...state,amount:cartItems.amount + 1}
                    }
                    if(action.payload.type= 'decrease'){
                        return {...state,amount:cartItems.amount - 1}
                   }
                }
                return cartItems
            }).filter(cartItems => cartItems.amount !== 0)
            return{...state,cart:tempCart3}
        }
        throw new Error('No matching action type')
}
export default Reducer;
