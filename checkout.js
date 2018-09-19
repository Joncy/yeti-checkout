var currentPlan = null;
var currentCountry = null;
var realCountry = null;
var loading = false;

const config = {
  apiKey: 'AIzaSyDUaJFJOrjZuv9hiiLumV8gd7FhfWQhhu0',
  authDomain: 'netbeast-yeti.firebaseapp.com',
  databaseURL: 'https://netbeast-yeti.firebaseio.com',
  projectId: 'netbeast-yeti',
  storageBucket: 'netbeast-yeti.appspot.com',
  messagingSenderId: '450847140847',
  clientId: '450847140847-snl2pcr0bu9nkasqtfp3eqsb5pv44o0p.apps.googleusercontent.com',
  scopes: ['email', 'profile']
}

// Initialize firebase client
firebase.initializeApp(config)

/* User log in, sign up and log out */
// Google login & signup
$('#login-google').click(() => {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
    .catch(err => console.log(err))
});

$('#signup-google').click(() => {
  var provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
    .catch(err => console.log(err))
});

// Facebook login & signup
$('#login-facebook').click(() => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithRedirect(provider)
    .catch(err => console.log(err))
})

$('#signup-facebook').click(() => {
  var provider = new firebase.auth.FacebookAuthProvider()
  firebase.auth().signInWithRedirect(provider)
    .catch(err => console.log(err))
})

$('#logout-button').click(function () {
  firebase.auth().signOut()
    .then(() => {
      Cookies.remove('email')
      Cookies.remove('uid')
      return location.reload()
    }).catch(error => {
      console.log('Error', error)
    })
})

// Switch from sign up form to log in form and viceversa
$('#sign-up-link').click(function () {
  $('#log-in-container').toggle();
  $('#sign-up-container').toggle();
});

$('#log-in-link').click(function () {
  $('#log-in-container').toggle();
  $('#sign-up-container').toggle();
});

// Display plan selector for user country
$('.display-plans-link').click(function () {
  switch (currentCountry) {
    case "EU":
      $('#form-col').hide();
      $('#plan-group-eur').show();
      $('.display-plans-link').toggle();
      $('.display-form-link').toggle();
      break;
    case "GB":
      $('#form-col').hide();
      $('#plan-group-gbp').show();
      $('.display-plans-link').toggle();
      $('.display-form-link').toggle();
      break;
    case "US":
      $('#form-col').hide();
      $('#plan-group-usd').show();
      $('.display-plans-link').toggle();
      $('.display-form-link').toggle();
      break;
    default:
  }
});

// Display Form when selecting "Continue with ..." button
$('.display-form-link').click(function () {
  switch (currentCountry) {
    case "EU":
      $('#plan-group-eur').hide();
      $('#form-col').show();
      $('.display-form-link').toggle();
      $('.display-plans-link').toggle();
      break;
    case "GB":
      $('#plan-group-gbp').hide();
      $('#form-col').show();
      $('.display-form-link').toggle();
      $('.display-plans-link').toggle();
      break;
    case "US":
      $('#plan-group-usd').hide();
      $('#form-col').show();
      $('.display-form-link').toggle();
      $('.display-plans-link').toggle();
      break;
    default:
  }
});

// Change current plan
$('#premium-annual-eur').click(function () {
  changePlan("annual-eur", "monthly-eur");
});

$('#premium-monthly-eur').click(function () {
  changePlan("monthly-eur", "annual-eur");
});

$('#premium-annual-gbp').click(function () {
  changePlan("annual-gbp", "monthly-gbp");
});

$('#premium-monthly-gbp').click(function () {
  changePlan("monthly-gbp", "annual-gbp");
});

$('#premium-annual-usd').click(function () {
  changePlan("annual-usd", "monthly-usd");
});

$('#premium-monthly-usd').click(function () {
  changePlan("monthly-usd", "annual-usd");
});

// Get user country and show appropriate plan
$(document).ready(function () {
  var urlParams = new URLSearchParams(window.location.search);
  var selectedPlan = urlParams.get('plan');

  $.get("https://ipinfo.io", function (response) {
    switch (response.country) {
      case "AS":
      case "AT":
      case "BE":
      case "CY":
      case "EE":
      case "FI":
      case "FR":
      case "ES":
      case "DE":
      case "GR":
      case "IE":
      case "IT":
      case "LV":
      case "LU":
      case "MT":
      case "MC":
      case "ME":
      case "NL":
      case "PT":
      case "SM":
      case "SK":
      case "SI":
      case "VA":
        $('#container-loading').hide();
        if (selectedPlan == "annual") {
          $('#contents-annual-eur').show();
          currentPlan = "premium-annual-eur";
          $('#premium-annual-eur').css("border-color", "#59cbe8");
        } else {
          $('#contents-monthly-eur').show();
          currentPlan = "premium-monthly-eur";
          $('#premium-monthly-eur').css("border-color", "#59cbe8");
        }
        currentCountry = "EU";
        realCountry = response.country;
        break;
      case "GB":
        $('#container-loading').hide();
        if (selectedPlan == "annual") {
          $('#contents-annual-gbp').show();
          currentPlan = "premium-annual-gbp";
          $('#premium-annual-gbp').css("border-color", "#59cbe8");
        } else {
          $('#contents-monthly-gbp').show();
          currentPlan = "premium-monthly-gbp";
          $('#premium-monthly-gbp').css("border-color", "#59cbe8");
        }
        currentCountry = "GB";
      case "US":
        $('#container-loading').hide();
        if (selectedPlan == "annual") {
          $('#contents-annual-usd').show();
          currentPlan = "premium-annual-usd";
          $('#premium-annual-usd').css("border-color", "#59cbe8");
        } else {
          $('#contents-monthly-usd').show();
          currentPlan = "premium-monthly-usd";
          $('#premium-monthly-usd').css("border-color", "#59cbe8");
        }
        currentCountry = "US";
        realCountry = response.country;
        break;
      default:
        $('#container-loading').hide();
        if (selectedPlan = "annual") {
          $('#contents-annual-usd').show();
          currentPlan = "premium-annual-usd";
          $('#premium-annual-usd').css("border-color", "#59cbe8");
        } else {
          $('#contents-monthly-usd').show();
          currentPlan = "premium-monthly-usd";
          $('#premium-monthly-usd').css("border-color", "#59cbe8");
        }
        currentCountry = "US";
        realCountry = response.country;
    }
  }, "jsonp");
});

/* Payment information handling */
// Prevent webflow from handling the form
var Webflow = Webflow || [];
Webflow.push(function () {
  // === Custom Form Handling ===

  // unbind webflow form handling
  $(document).off('submit');

  // new form handling
  $('#wf-form-Payment-Info-Form').submit(function (evt) {
    evt.preventDefault();

    // Check if user logged in, if not, reload with error message
    var urlParams = new URLSearchParams(window.location.search);
    if (!Cookies.get('email') || !Cookies.get('uid'))
      if (urlParams.get('plan'))
        return window.location.replace(window.location.href + "&login")
      else
        return window.location.replace(window.location.href + "?login")

    // Show loading state in button
    $('#submit-card-info').hide();
    $('#submit-button-loading').show();


    const data = {
      email: Cookies.get('email'),
      uid: Cookies.get('uid'),
      number: $('#card-number').val(),
      exp_month: $('#expiry-month option:checked').val(),
      exp_year: $('#expiry-year option:checked').val(),
      cvc: $('#cvc').val(),
      name: $('#card-owner-name').val(),
      plan: kebabToSnake(currentPlan)
    }

    console.log(data)

    $.ajax({
      type: "POST",
      url: 'https://netbeast-api-staging.now.sh/api/payment',
      data: data,
      success: () => {
        console.log('Success')
      },
      error: (error) => {
        console.log({error})
        // Show button again
        $('#submit-card-info').show();
        $('#submit-button-loading').hide();
      }
    });
  });
});

/* Form validation */
$('#card-number').keydown(function (event) {
  console.log("Key preseed: " + event.which)
  console.log("Value input is: " + $('#card-number').val())

  var inputValue = $('#card-number').val() // Valor del input)

  if ((event.which < 48 || event.which > 57) && event.which != 8)
    event.preventDefault();
  else {
    if (event.which != 8) {
      const pressedKey = event.key // Valor pulsado
      const result = inputValue.concat(pressedKey)

      switch (result) {
        case '4':
        case '41':
        case '42':
        case '43':
        case '44':
        case '45':
        case '46':
        case '47':
        case '48':
        case '49':
          $('#inline-visa').show();
          break;
        case '50':
        case '51':
        case '52':
        case '53':
        case '54':
        case '55':
          $('#inline-mastercard').show();
          break;
        case '34':
        case '37':
          $('#inline-amex').show();
          break;
        default:
          if (result.length < 3) {
            $('#inline-visa').hide();
            $('#inline-mastercard').hide();
            $('#inline-amex').hide();
          }
      }
    } else {
      inputValue = inputValue.slice(0, -1)
      console.log("Input is now: " + inputValue)

      if (inputValue.length < 2) {
        switch (inputValue) {
          case "4":
            break;
          default:
            $('#inline-visa').hide();
            $('#inline-mastercard').hide();
            $('#inline-amex').hide();
        }
      }
    }
  }


  // if 4*** **** **** **** then visa
  // else if 5[0-5]** **** **** **** then mastercard
  // else if 3(4/7)** **** ****
})

/*
  if (0 < $('#card-number').val().length < 3) {
    
  }
*/




/* Function declarations */
// Transform kebab case to snake case
function kebabToSnake (str) {
  var myString = str.replace(/-/g, "_");
  return myString;
}

// Change plan summary when user selects it on plan selector
function changePlan (targetPlan, otherPlan) {
  $('#contents-' + otherPlan).hide();
  $('#contents-' + targetPlan).show();
  $('#premium-' + targetPlan).css("border-color", "#59cbe8");
  $('#premium-' + otherPlan).css("border-color", "rgba(17,50,80,.25)");
  currentPlan = "premium-" + targetPlan;
}

// Catch firebase redirects and get info into cookies
$(document).ready(() => {
  firebase.auth().getRedirectResult()
    .then(result => {
      if (result.user) {
        $('#form-loading').hide();
        $('#log-in-container').hide();
        $('#sign-up-container').hide();
        $('#payment-container').show();

        // Set user parameters in firebase
        setCookie(result.user.uid, result.user.email, result.credential.providerId, result.user.displayName)

        const data = {
          email: Cookies.get('email'),
          uid: Cookies.get('uid'),
          provider: Cookies.get('provider'),
          name: Cookies.get('name')
        }

        if (!result.additionalUserInfo.isNewUser) {
          $.ajax({
            type: "POST",
            url: 'https://netbeast-api-staging.now.sh/api/setuser',
            data: data,
            success: () => {
              console.log('Success')
            },
            error: (error) => {
              console.log({error})
            }
          });
        } else {
          console.log("User already created")
        }

      } else {
        if (Cookies.get('email') && Cookies.get('uid')) {
          $('#form-loading').hide();
          $('#log-in-container').hide();
          $('#sign-up-container').hide();
          $('#payment-container').show();
          $('#logout-button').show();
        } else {
          $('#form-loading').hide();
          $('#log-in-container').show();
          $('#sign-up-container').hide();
          $('#payment-container').hide();
          $('#logout-button').hide();

          var urlParams = new URLSearchParams(window.location.search)
          if (urlParams.get('login') !== null) {
            $('#log-in-required-alert').fadeIn()

            window.setTimeout(function () {
              $('#log-in-required-alert').fadeOut()
            }, 4000)
          }
        }
      }
    })
    .catch(err => console.log(err))
})

// Save a uid and email into a cookie
function setCookie (uid, email, provider, name) {
  Cookies.set('uid', uid)
  Cookies.set('email', email)
  Cookies.set('provider', provider)
  Cookies.set('name', name)
}