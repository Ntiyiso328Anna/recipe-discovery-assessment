<script setup>
import avocadoImage from '../assets/ingredients/avocado.png'
import beefStockImage from '../assets/ingredients/beef-stock.png'
import beansImage from '../assets/ingredients/beans.png'
import blackPepperImage from '../assets/ingredients/black-pepper.png'
import breadcrumbsImage from '../assets/ingredients/breadcrumbs.png'
import brisketImage from '../assets/ingredients/brisket.png'
import brownSugarImage from '../assets/ingredients/brown-sugar.png'
import butterImage from '../assets/ingredients/butter.png'
import cayenneImage from '../assets/ingredients/cayenne.png'
import chickenImage from '../assets/ingredients/chicken.png'
import chilliPowderImage from '../assets/ingredients/chilli-powder.png'
import cinnamonImage from '../assets/ingredients/cinnamon.png'
import cilantroImage from '../assets/ingredients/cilantro.png'
import cornflourImage from '../assets/ingredients/cornflour.png'
import eggsImage from '../assets/ingredients/eggs.png'
import flourImage from '../assets/ingredients/flour.png'
import garlicPowderImage from '../assets/ingredients/garlic-powder.png'
import lemonImage from '../assets/ingredients/lemon.png'
import lettuceImage from '../assets/ingredients/lettuce.png'
import limeImage from '../assets/ingredients/lime.png'
import milkImage from '../assets/ingredients/milk.png'
import mustardImage from '../assets/ingredients/mustard.png'
import oilImage from '../assets/ingredients/oil.png'
import onionImage from '../assets/ingredients/onion.png'
import onionPowderImage from '../assets/ingredients/onion-powder.png'
import paprikaImage from '../assets/ingredients/paprika.png'
import pepperImage from '../assets/ingredients/pepper.png'
import pepperGrinderImage from '../assets/ingredients/pepper-grinder.png'
import porkImage from '../assets/ingredients/pork.png'
import saltImage from '../assets/ingredients/salt.png'
import seasoningImage from '../assets/ingredients/seasoning.png'
import tomatoesImage from '../assets/ingredients/tomatoes.png'
import vanillaImage from '../assets/ingredients/vanilla.png'
import vegetableOilImage from '../assets/ingredients/vegetable-oil.png'
import vinegarImage from '../assets/ingredients/vinegar.png'
import whiteSugarImage from '../assets/ingredients/white-sugar.png'
import yogurtImage from '../assets/ingredients/yogurt.png'

defineProps({ ingredients: { type: Array, default: () => [] } })

const displayIngredient = (ingredient) =>
  typeof ingredient === 'string' ? ingredient : ingredient.label
const displayQuantity = (ingredient) =>
  typeof ingredient === 'string'
    ? ''
    : [ingredient.quantity, ingredient.unit].filter(Boolean).join(' ')

const iconType = (ingredient) => {
  const label = displayIngredient(ingredient).toLowerCase()
  if (/lettuce|leaf|cabbage|greens|herb|cilantro/.test(label)) return 'leaf'
  if (/avocado/.test(label)) return 'avocado'
  if (/onion|garlic/.test(label)) return 'onion'
  if (/pepper|seasoning|spice|salt/.test(label)) return 'seasoning'
  if (/peanut|nut|seed/.test(label)) return 'nuts'
  return 'bowl'
}

const ingredientPhoto = (ingredient) => {
  const label = displayIngredient(ingredient).toLowerCase()
  if (/beef brisket|brisket/.test(label)) return brisketImage
  if (/brown sugar/.test(label)) return brownSugarImage
  if (/paprika/.test(label)) return paprikaImage
  if (/garlic powder/.test(label)) return garlicPowderImage
  if (/onion powder/.test(label)) return onionPowderImage
  if (/cayenne/.test(label)) return cayenneImage
  if (/chilli powder|chili powder/.test(label)) return chilliPowderImage
  if (/ground black pepper/.test(label)) return pepperGrinderImage
  if (/beef stock|beef broth/.test(label)) return beefStockImage
  if (/apple cider vinegar|vinegar/.test(label)) return vinegarImage
  if (/mustard/.test(label) && !/olive oil/.test(label)) return mustardImage
  if (/cornflour|corn flour|cornstarch/.test(label)) return cornflourImage
  if (/all-purpose flour|plain flour|\bflour\b/.test(label)) return flourImage
  if (/vegetable oil/.test(label)) return vegetableOilImage
  if (/\bbutter\b/.test(label)) return butterImage
  if (/\bsugar\b/.test(label)) return whiteSugarImage
  if (/\beggs?\b/.test(label)) return eggsImage
  if (/\bmilk\b/.test(label)) return milkImage
  if (/vanilla/.test(label)) return vanillaImage
  if (/cinnamon/.test(label)) return cinnamonImage
  if (/pork loin|pork cutlet|pork/.test(label)) return porkImage
  if (/breadcrumb/.test(label)) return breadcrumbsImage
  if (/lemon/.test(label)) return lemonImage
  if (/black pepper/.test(label)) return blackPepperImage
  if (/lettuce|leaf|cabbage|greens/.test(label)) return lettuceImage
  if (/chicken|turkey/.test(label)) return chickenImage
  if (/seasoning|spice/.test(label)) return seasoningImage
  if (/tomato/.test(label)) return tomatoesImage
  if (/bell pepper/.test(label)) return pepperImage
  if (/black beans|beans/.test(label)) return beansImage
  if (/avocado/.test(label)) return avocadoImage
  if (/onion|garlic/.test(label)) return onionImage
  if (/cilantro|coriander/.test(label)) return cilantroImage
  if (/lime/.test(label)) return limeImage
  if (/yogurt|yoghurt|sour cream/.test(label)) return yogurtImage
  if (/olive oil|cooking oil/.test(label)) return oilImage
  if (/\bsalt\b/.test(label)) return saltImage
  return null
}
</script>

<template>
  <section class="detail-content-section" aria-labelledby="ingredients-heading">
    <div class="detail-content-section__heading">
      <h2 id="ingredients-heading">Ingredients</h2>
      <span>{{ ingredients.length }} items</span>
    </div>
    <ul class="ingredient-list">
      <li v-for="(ingredient, index) in ingredients" :key="displayIngredient(ingredient)">
        <span
          class="ingredient-list__marker"
          :class="[`ingredient-list__marker--${index % 5}`, `is-${iconType(ingredient)}`]"
          aria-hidden="true"
        >
          <img
            v-if="ingredientPhoto(ingredient)"
            :src="ingredientPhoto(ingredient)"
            :alt="`${displayIngredient(ingredient)} icon`"
          />
          <svg v-else-if="iconType(ingredient) === 'leaf'" viewBox="0 0 24 24">
            <path
              d="M19.8 3.8C12.4 3.4 7.2 6.1 6.1 11.3c-.8 3.8 1.7 6.8 5.2 6.8 5.7 0 8.2-6.6 8.5-14.3Z"
            />
            <path d="M4 20c3.2-5.3 7-8.8 11.8-11.1" />
          </svg>
          <svg v-else-if="iconType(ingredient) === 'avocado'" viewBox="0 0 24 24">
            <path
              d="M12 3c-2.2 0-3 3.2-4.7 5.8C5.8 11 5 12.9 5 15a7 7 0 0 0 14 0c0-2.1-.8-4-2.3-6.2C15 6.2 14.2 3 12 3Z"
            />
            <circle cx="12" cy="15" r="2.6" />
          </svg>
          <svg v-else-if="iconType(ingredient) === 'onion'" viewBox="0 0 24 24">
            <path d="M12 4c0 3.3-6 5-6 10a6 6 0 0 0 12 0c0-5-6-6.7-6-10Z" />
            <path d="M12 4V2M9 14c.8 1.3 1.8 2.3 3 3M15 14c-.8 1.3-1.8 2.3-3 3" />
          </svg>
          <svg v-else-if="iconType(ingredient) === 'seasoning'" viewBox="0 0 24 24">
            <path d="m9 4 6 1 1 4-8-1 1-4Zm-1 4h8l1 12H7L8 8Z" />
            <path d="M10 12h.01M13 14h.01M11 17h.01" />
          </svg>
          <svg v-else-if="iconType(ingredient) === 'nuts'" viewBox="0 0 24 24">
            <path
              d="M9.2 4.2c3.4.9 4.5 4.2 3 7.3s-5.2 4.7-7.6 2.6c-2.2-2-.4-6 1.2-8.1.9-1.2 2-2.1 3.4-1.8Z"
            />
            <path d="M14.8 9.5c3.4.9 4.5 4.2 3 7.3s-5.2 4.7-7.6 2.6c-1.1-1-.9-2.7-.3-4.4" />
          </svg>
          <svg v-else viewBox="0 0 24 24">
            <path d="M4 10h16c0 5.5-3.6 9-8 9s-8-3.5-8-9Z" />
            <path d="M3 10h18M8 6c0-1 1-1 1-2M12 6c0-1 1-1 1-2M16 6c0-1 1-1 1-2" />
          </svg>
        </span>
        <span>{{ displayIngredient(ingredient) }}</span
        ><small>{{ displayQuantity(ingredient) }}</small>
      </li>
    </ul>
  </section>
</template>
