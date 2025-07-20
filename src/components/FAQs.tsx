import React, { useEffect } from "react"; //REF (useEffect): https://legacy.reactjs.org/docs/hooks-effect.html
import { ArrowDown, ArrowUp } from "lucide-react";

//UNDERSTAND: UseEffect and JS
// it us used to handle actions after a component has intially been loaded 
// so it will remain in state till the componenets state has been manipulated 
// it will then run the effect which has been defined in the function

export const FAQs = () => {
  useEffect(() => {
    const faqs = document.querySelectorAll<HTMLDivElement>('#toggle-faqs');
    
    faqs.forEach((faq) => {
      faq.addEventListener('click', () => {
        const content = faq.querySelector('p');
        const isHidden = content?.classList.contains('hidden');

        document.querySelectorAll('#toggle-faqs p').forEach((p) => p.classList.add('hidden'));

        if (isHidden) {
          content?.classList.remove('hidden');
        }
      });
    });

    return () => {
      faqs.forEach((faq) => {
        faq.replaceWith(faq.cloneNode(true));
      });
    };
  }, []);

  return (
    <section className="bg-gray-200 text-black py-20 md:mt-0">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center">
        <div className="w-full bg-black rounded p-4">
          <h1 className="text-2xl text-white mb-4">
            Frequently Asked Questions
          </h1>

          <div id="toggle-faqs" className="bg-white p-2 mb-2">
            <h1 className="text-xl rounded-xl font-bold">How Do I Decide Which Package To Go For?</h1>
            <p className="text-black">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, perspiciatis labore laudantium vero placeat corporis similique. Fugiat ea dignissimos sint labore, illum cum quae ullam magnam maxime totam cupiditate accusantium.
              Itaque consequuntur perspiciatis architecto, minus consectetur delectus pariatur eos magni quo alias, voluptatibus, officia veniam ea voluptas ratione asperiores exercitationem velit animi. Veniam quisquam quos expedita, maxime ratione sed accusamus.
            </p>
          </div>

          <div id="toggle-faqs" className="bg-white p-2 mb-2">
            <h1 className="text-xl rounded-xl font-bold">Are Plans a One Off Payment?</h1>
            <p className="text-black hidden">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed consequatur, rerum in odit vel maiores obcaecati minus ullam maxime pariatur consequuntur ad omnis deserunt praesentium vitae, quas, delectus nulla ipsum!
              Numquam pariatur repellendus quia debitis quam voluptas minima mollitia, accusantium laudantium laborum culpa, eaque sunt neque quod necessitatibus fuga perferendis iure, non expedita facere soluta veritatis. Fuga voluptate amet suscipit!
            </p>
          </div>

          <div id="toggle-faqs" className="bg-white p-2">
            <h1 className="text-xl rounded-xl font-bold">What Will Be Covered During the Free Consultation?</h1>
            <p className="text-black hidden">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam laborum excepturi aliquam harum consequatur optio nulla sint quia, recusandae explicabo nostrum quasi provident nesciunt tempora! Facilis ipsa incidunt blanditiis at!
              Sed quasi facilis consectetur aut exercitationem. Magni ad voluptatem dolores aliquid blanditiis iste magnam saepe tempore tempora enim, doloremque sapiente consequatur quas voluptatibus sint fugit eaque ut ea recusandae quasi!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
