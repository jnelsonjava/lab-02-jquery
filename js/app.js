'use strict'

const holdAllAnimals = [];

const optionObject = {
  method: 'get',
  dataType: 'json'
};

$.ajax('data/page-1.json', optionObject)
  .then(function(listOfAnimals){
    listOfAnimals.forEach(newAnimal => {
      new Animal(newAnimal.image_url, newAnimal.title, newAnimal.description, newAnimal.keyword, newAnimal.horns);
    })
    holdAllAnimals.forEach(eachAnimal => eachAnimal.render())
    holdAllAnimals.forEach(eachOption => eachOption.addOption())
  });

function Animal (image_url, title, description, keyword, horns){
  this.image_url = image_url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
  holdAllAnimals.push(this);
}

Animal.prototype.render = function(){
  const $templateClone = $('#photo-template').clone();

  $templateClone.find('h2').text(this.title);
  $templateClone.find('img').attr('src', this.image_url).attr('alt', this.description);
  $templateClone.find('p').text(this.description);
  $('main').append($templateClone);
}

Animal.prototype.addOption = function(){
  const $optionClone = $('option:first-child').clone();
  $optionClone.text(this.keyword);
  $optionClone.val(this.keyword);
  $('select').append($optionClone);
}

//Stack Overflow provided guidance for creating the following function
//https://stackoverflow.com/questions/5749597/jquery-select-option-click-handler
//Jquery API also helped with the each statements.
//https://api.jquery.com/each/
$('select').change(function(){
  const $userSelection = $(this).val();
  console.log($userSelection);
  $('section').hide();
  holdAllAnimals.forEach(function(eachStoredAnimal){
    if($userSelection === eachStoredAnimal.keyword){
      const animalTitle = eachStoredAnimal.title;
      const animalSections = $('section');
      console.log(animalSections);
      animalSections.each(function(){
        if($(this).find('h2').text() === animalTitle){
          $(this).show();
        }
      })
    }
  });
})