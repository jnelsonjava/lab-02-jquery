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


