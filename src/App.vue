
<script setup>
import { v4 as uuid4} from 'uuid';
import { reactive, ref } from '@vue/reactivity';
import { onMounted, nextTick } from 'vue';

import ListInputFields from './components/ListInputFields.vue';

/**
 * @shoppingListItem array that which holds shopping list items
 * @addItemBtn is used to set focus on initial page load.
 * @isNewItem allows us to distinguish between new array item or previous item from array.
 * @itemSkeleton is a bare bone array structure which is passed when add button is cliked. 
 *
 */
const shoppingListItems = ref([]);
const addItemBtn = ref(null)
const isNewItem = ref(true)
const itemSkeleton = {
  id: uuid4(),
  item: '',
  quantity: 0,
  edit: true
}

/**
 * @addItem function adds an item to shopingList array
 */
const addItem = () => {
  isNewItem.value = true
  shoppingListItems.value.push({ ...itemSkeleton})
}

/**
 * Triggers edit input field on existing shoppingListItem
 */
const editItem = (index, arr) =>{
  isNewItem.value = false
  arr.edit = true
}

/**
 * deletes item from shoppingList
 * Since we are already removing item on local memory, all we need to do is set new mutated items 
 * to local storage.
 */
const deleteItem = (index)=> {
  shoppingListItems.value.splice(index, 1)
  localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListItems.value))
}

/**
 * cancel button action, where we are only setting edit mode flag to false.
 */
const cancel = (arr) =>{
  arr.edit = false;
}

/**
 * @param {itemArray, index} data is an object that is emitted from child input component.
 * @itemArray will have @item @quantity @id and @edit fields.
 * @index field is needed here to update array that was set via @itemSkeleton
 * lastly we will set this item to @localStorage.
 */
const addOrEditItem = (data) =>{
  const { itemArray, index } = data;

    shoppingListItems.value.splice(index, 1, 
      { 
        id: itemArray.id, 
        item: itemArray.item , 
        quantity: itemArray.quantity, 
        edit: itemArray.edit
      }
    )
    localStorage.setItem('shoppingListItems', JSON.stringify(shoppingListItems.value))

}

onMounted(() =>{
  /**
   * Check if localStorage has shoppingListItems.
   * if it has then set it to our local ref shoppingListItems 
   */
  const localStorageItems = localStorage.getItem('shoppingListItems');
  if(localStorageItems){
    shoppingListItems.value = JSON.parse(localStorageItems)
  }

  /**
   * this will set 'AddItem' button to focus on page load.
   */
  nextTick(() =>{
    addItemBtn.value.focus()
  })
})
</script>

<template>
  <div class="card">
    <div class="top">
      <button 
        class="btn" 
        @click="addItem" 
        ref="addItemBtn"
      >
      Add item
    </button>
    </div>
    <ul class="list">
      <div class="list__heading">
        <span>Item</span>
        <span>Quantity</span>
        <span></span>
      </div>
      <li 
        class="list__item"
        v-for="(shoppingItem, index) in shoppingListItems"
        :class="{'border-bottom': shoppingListItems && shoppingListItems.length}"
        :key="shoppingItem.id"
      >
      <!-- Item list component-->
        <template v-if="shoppingListItems && !shoppingListItems[index].edit">
          <span class="list__item-text">{{  shoppingItem.item }}</span>
          <span class="list__item-quantity">{{ shoppingItem.quantity }}</span>
          <div class="list__item-actions actions-buttons">
            <button class="btn-edit mr" @click="editItem(index, shoppingItem)">Edit</button>
            <button class="btn-delete" @click="deleteItem(index)">Delete</button>
          </div>
        </template>
        <!-- Edit input component-->
        <ListInputFields
          :isNewItem="isNewItem" 
          :items="shoppingListItems.value"
          :shoppingItem="shoppingItem.item"
          :itemQuantity="shoppingItem.quantity" 
          :editOnIndex="shoppingListItems[index].edit"
          :itemIndex="index"
          @cancel="cancel(shoppingItem)"
          @add="addOrEditItem"
          @delete="deleteItem(index)"
        />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  .top {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
    .list{

      list-style: none;
      font-size: inherit;
      min-width: 600px;
      height: 800px;
      padding: 15px 20px;

      &__heading{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
        padding: 15px 0;
        font-weight:bold;

        & > span{
          align-content: flex-start;
          margin-right: auto;
        }
      }

      &__item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 20px;
       
        &__item:not(:last-child){
          margin-bottom: 15px;
        }

        &-text,
        &-quantity,
        &-actions {
          text-align: left;
          flex-basis: 100%;
        }
      }
      .border-bottom {
        border-bottom: 1px solid #ccc!important;
        padding: 18px 0;
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
    .action-buttons{
      display: flex;
      justify-content: flex-end;
    }
</style>
