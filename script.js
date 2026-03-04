document.addEventListener("DOMContentLoaded", function () {
  var stepData = [
    { num: "01", title: "Discovery", desc: "We start with a detailed discussion to understand your goals, needs, and project requirements.", note: "Clear communication and understanding is key." },
    { num: "02", title: "Proposal & Agreement", desc: "I will provide a clear proposal outlining the scope, timeline, and cost. Once agreed, we will formalize it with a straightforward agreement.", note: "Transparent pricing. 50% deposit required to begin." },
    { num: "03", title: "Design Approval", desc: "I will provide initial designs/mockups for your review and feedback.", note: "Two rounds of revisions included to refine the design." },
    { num: "04", title: "Development", desc: "Upon approval, I will begin delivering your project, keeping you updated throughout the process.", note: "You will be kept updated throughout." },
    { num: "05", title: "Delivery", desc: "Once finalized and you are happy with the result, I will launch your website and provide all necessary files.", note: "All necessary files provided." },
    { num: "06", title: "Maintenance", desc: "I will provide continuous support to keep your site updated and performing well.", note: "Ongoing support available." }
  ];

  var steps = document.querySelectorAll(".process-step");

  function updateSidebar(i) {
    var t = document.getElementById("detail-step-title");
    var d = document.getElementById("detail-step-desc");
    var s = document.getElementById("steps-from-list");
    if (t) t.textContent = stepData[i].title;
    if (d) d.textContent = stepData[i].desc;
    if (s) {
      var html = "";
      for (var j = 0; j <= i; j++) {
        html += '<div class="steps-from-item"><span class="steps-from-num">' + stepData[j].num + " " + stepData[j].title + '</span></div>';
        html += '<div style="font-size:13px;color:#4b5563;margin-bottom:8px">' + stepData[j].note + '</div>';
      }
      s.innerHTML = html;
    }
  }

  window.selectStep = function (i) {
    steps.forEach(function (s) { s.classList.remove("active"); });
    steps[i].classList.add("active");
    updateSidebar(i);
  };

  if (steps.length) {
    steps[0].classList.add("active");
    updateSidebar(0);
  }
});