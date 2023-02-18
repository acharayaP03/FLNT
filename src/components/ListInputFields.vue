<template>
    <div class="input" v-if="items && editOnIndex">
        <div class="input__text">
            <input
                ref="inputfield" 
                type="text" 
                v-model="item" 
                placeholder="Enter your item.."
                :class="{ 'error': error}"
                @blur="handleBlur"
                @focus="handleFocus"
            />
            <span>{{ errorMessage }}</span>
        </div>
        <div class="input__quantity"><input type="number" min="0" v-model="quantity"></div>
        <div class="actions-buttons">
            <button 
                class="btn-add mr" 
                @click="addEditItem" 
                :disabled="error || !itemNotEmpty"
            >
                Add
            </button>
            <button v-if="!isNewItem" class="btn-delete" @click="cancel">Cancel</button>
            <button
                v-else
                class="btn-delete" 
                @click="handleDelete"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<script>
import { v4 as uuid4} from 'uuid';
export default {
    name: 'ListInputFields',
    props:{
        /**
         * @isNewItem flag that denotes if array item is new or old
         * this will be used to show cancel button if not new item else delete if new
         */
        isNewItem:{
            type: Boolean,
            default:false
        },
        /**
         * @items shoppingListItems passed from parent component
         */
        items:{
            type: Array,
            default: () => []
        },
        /**
         * @shoppingItem shoopingListItem['item'] 
         */
        shoppingItem: {
            type: String,
            default: ''
        },
        /**
         * @itemOnIndex array item index
         */
        itemOnIndex:{
            type: Object,
            default: () => {}
        },
        /**
         * @itemQuantity shoopingListItem['quantity'] 
         */
        itemQuantity:{
            type: Number,
            default: 0
        },
        /**
         * @editOnIndex shoopingListItem['edit'] 
         */
        editOnIndex:{
            type: Boolean,
            default: false
        },
        /**
         * @itemIndex array index
         */
        itemIndex:{
            type: Number,
            default: 0
        },
    },  
    data(){
        return{
            item: this.shoppingItem,
            quantity: this.itemQuantity,
            error: false,
            errorMessage: ''
        }
    },
    computed:{
        /**
         * @return return true if this.item of shoppingListItem props is not empty.
         * we are using this to validate if item input field is empty during edit or adding new item.
         */
        itemNotEmpty(){
            return this.item ? true : false
        }
    },  
    methods:{
        /**
         * most methods are emmiting event to the parent component.
         * @handleDelete emit delete event
         */
        handleDelete(){
            this.$emit('delete')
        },
        /**
         * most methods are emmiting event to the parent component.
         * @cancel emit cancel event, and set error and errorMessage to false and ''.
         */
        cancel(){
            this.item = this.shoppingItem // this needs to be set back to shoppingItem props if user cancel with out editing
            if(this.error){
                this.removeError() // remove error
            }
            this.$emit('cancel')
        },
        /**
         * most methods are emmiting event to the parent component.
         * @handleBlur show error when user focues away from input 
         */
        handleBlur(){
            if(this.item === ''){
                this.error = true;
                this.errorMessage = 'Cannot leave item empty';
                return;
            }
            this.removeError()
        },
        /**
         * @handleFocus remove error and errorMessage
         */
        handleFocus(){
            if(this.error && this.errorMessage !== ''){
                this.removeError()
            }
        },
        /**
         * @addEditItem emit add event with data.
         * itemArray will be used to update the shoppingList array with index.
         */
        addEditItem(){
            const itemArray = { id: uuid4(), item: this.item ,quantity: this.quantity, edit: false}
            this.$emit('add', { itemArray, index: this.itemIndex})
        },
        removeError(){
            this.error = false;
            this.errorMessage = ''
        }
    },
}
</script>
<style lang="scss" scoped>

.input {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;

    &__text{
        display: block;
        position: relative;
        span {
            position: absolute;
            bottom: -10px;
            left: 0;
            font-size: 10px;
            color: rgb(189, 15, 15);
        }
    }

    .actions-buttons{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
    }

    .error {
        border: 1px solid red;
    }
}

.btn {
      &-delete {
        border: 1px solid red;

        &:focus{
          outline-style: none;
        }
      }
    }
</style>
