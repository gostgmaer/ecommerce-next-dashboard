"use client"
import CartServices from "@/helper/network/services/cartService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  status: 'idle',
  error:null,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};


// export const saveCartToBackend = createAsyncThunk(
//   'cart/saveCartToBackend',
//   async (cartData, { rejectWithValue }) => {
//     try {
//       const response = await CartServices.addtoCart(cartData)
//       return response.data; // Returning response to be handled in extraReducers
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const saveCartToBackend = createAsyncThunk(
  'cart/saveCartToBackend',
  async (cartData, thunkAPI) => {
    try {
      const response = await CartServices.addtoCart(cartData)
      return response.data; // Returning the response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


export const CartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart(state, action) {
  
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

 
      
      if (product >= 0) {
        state.cartItems[product].cartQuantity += 1;
        const cartData = {
          productId: action.payload.id,
          quantity: state.cartItems[product >= 0 ? product : state.cartItems.length - 1].cartQuantity,
        };
   
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
  
        state.cartItems.push(tempProduct);
      }

   
      return state;
      
    },

    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );

          state.cartItems = nextCartItems;
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } else{
        state.cartItems.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            const nextCartItems = state.cartItems.filter(
              (item) => item.id !== cartItem.id
            );
  
            state.cartItems = nextCartItems;
          }
        //  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
          return state;
        });
      }

     
    },
    incrementCart(state, action) {
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (product >= 0) {
        state.cartItems[product].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }

     // localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    addByIncrement(state, action) {

     
      
      const product = state.cartItems.findIndex(
        (item) => item.id === action.payload.product.id
      );
      if (product >= 0) {
        state.cartItems[product].cartQuantity +=action.payload.cartQuantity;
      } else {
        const cartQuantity = action.payload.cartQuantity===1?1:action.payload.cartQuantity 
        const tempProduct = { ...action.payload.product,cartQuantity};
        state.cartItems.push(tempProduct);
      }

    //  localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          // /////console.log(cartItem);
          
          const { prices, cartQuantity } = cartItem;
         
          
          const itemTotal = prices.price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(saveCartToBackend.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(saveCartToBackend.fulfilled, (state, action) => {
        state.status = 'succeeded';
        /////console.log('Cart saved successfully:', action.payload);
      })
      .addCase(saveCartToBackend.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        console.error('Error saving cart:', action.payload);
      });
  },
});

export const { addToCart,emptyCart, removeFromCart,decreaseCart,incrementCart, getTotals,addByIncrement} = CartSlice.actions;

export const cartReducer = CartSlice.reducer;
