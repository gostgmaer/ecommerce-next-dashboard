
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems:[],
  wishlistTotalQuantity: 0,
  wishlistTotalAmount: 0,
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addTowishlist(state, action) {
      /////console.log("state.wishlistItems",state["wishlist"]);
      /////console.log("action",action);
      
      const product = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      /////console.log(product);
      
      if (product >= 0) {
        state.wishlistItems[product].wishlistQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, wishlistQuantity: 1 };
        /////console.log(tempProduct);
        state.wishlistItems.push(tempProduct);
      }
      /////console.log(state.wishlistItems);
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      /////console.log(JSON.parse(localStorage.getItem("wishlistItems")));
    },

    removeFromwishlist(state, action) {
      state.wishlistItems.map((wishlistItem) => {
        if (wishlistItem.id === action.payload.id) {
          const nextwishlistItems = state.wishlistItems.filter(
            (item) => item.id !== wishlistItem.id
          );

          state.wishlistItems = nextwishlistItems;
        }
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
        return state;
      });
    },
    decreasewishlist(state, action) {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (state.wishlistItems[itemIndex].wishlistQuantity > 1) {
        state.wishlistItems[itemIndex].wishlistQuantity -= 1;
        localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
      } else{
        state.wishlistItems.map((wishlistItem) => {
          if (wishlistItem.id === action.payload.id) {
            const nextwishlistItems = state.wishlistItems.filter(
              (item) => item.id !== wishlistItem.id
            );
  
            state.wishlistItems = nextwishlistItems;
          }
          localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
          return state;
        });
      }

     
    },
    incrementwishlist(state, action) {
      const product = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (product >= 0) {
        state.wishlistItems[product].wishlistQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, wishlistQuantity: 1 };
        state.wishlistItems.push(tempProduct);
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    addByIncrement(state, action) {
      const product = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.product.id
      );
      if (product >= 0) {
        state.wishlistItems[product].wishlistQuantity +=action.payload.wishlistQuantity;
      } else {
        const wishlistQuantity = action.payload.wishlistQuantity===1?1:action.payload.wishlistQuantity 
        const tempProduct = { ...action.payload.product,wishlistQuantity};
        state.wishlistItems.push(tempProduct);
      }

      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlistItems));
    },
    getTotals(state, action) {
      let { total, quantity } = state.wishlistItems.reduce(
        (wishlistTotal, wishlistItem) => {
          const { price, wishlistQuantity } = wishlistItem;
          const itemTotal = price * wishlistQuantity;

          wishlistTotal.total += itemTotal;
          wishlistTotal.quantity += wishlistQuantity;

          return wishlistTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.wishlistTotalQuantity = quantity;
      state.wishlistTotalAmount = total;
    }
  },
});

export const { addTowishlist, removeFromwishlist,decreasewishlist,incrementwishlist, getTotals,addByIncrement} = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
