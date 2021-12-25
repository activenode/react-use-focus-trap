import React from "react";
import "./style.css";

import { useFocusTrap } from "react-use-focus-trap";

export default function App() {
  const [trapRef] = useFocusTrap();
  return (
    <div>
      <section>
        <form>
          <input type="text" />
          <input type="number" />
          <button>Foobar</button>
        </form>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis
          vitae et leo duis ut diam quam nulla porttitor. In nibh mauris cursus
          mattis molestie a iaculis at erat. Sodales ut eu sem integer vitae
          justo eget magna fermentum. Sed enim ut sem viverra aliquet eget sit
          amet. Nisi scelerisque eu ultrices vitae auctor eu. Facilisis gravida
          neque convallis a. Sodales neque sodales ut etiam sit amet nisl purus.
          Ornare arcu dui vivamus arcu. Neque egestas congue quisque egestas.
          Volutpat consequat mauris nunc congue. Ornare suspendisse sed nisi
          lacus sed viverra tellus in. Duis ut diam quam nulla porttitor massa
          id neque aliquam. Ac feugiat sed lectus vestibulum mattis ullamcorper
          velit sed. Viverra suspendisse potenti nullam ac. Sed risus ultricies
          tristique nulla aliquet enim tortor at. Arcu ac tortor dignissim
          convallis aenean et tortor. Pharetra massa massa ultricies mi quis
          hendrerit dolor magna eget. Lorem ipsum dolor sit amet consectetur
          adipiscing elit. Quam elementum pulvinar etiam non. Tortor dignissim
          convallis aenean et tortor. Proin nibh nisl condimentum id. Sagittis
          aliquam malesuada bibendum arcu vitae elementum curabitur. Enim ut
          tellus elementum sagittis vitae et leo. Risus at ultrices mi tempus
          imperdiet nulla malesuada pellentesque elit. Viverra accumsan in nisl
          nisi scelerisque eu. Mattis pellentesque id nibh tortor id aliquet.
          Sed vulputate mi sit amet mauris commodo quis imperdiet. Cum sociis
          natoque penatibus et magnis dis parturient montes nascetur. Erat velit
          scelerisque in dictum non. Mauris rhoncus aenean vel elit scelerisque
          mauris.
        </p>
      </section>
      <div className="modal" ref={trapRef}>
        <form>
          <input tabIndex="2" type="text" placeholder="2" />
          <input tabIndex="0" type="number" placeholder="0" />
          <input tabIndex="-1" type="number" placeholder="-1" />
          <input tabIndex="0" type="number" placeholder="0" />
          <input tabIndex="-1" type="number" placeholder="-1" />
          <input tabIndex="1" type="number" placeholder="1" />
          <button tabIndex="3" placeholder="3">
            Foobar
          </button>
        </form>
      </div>
    </div>
  );
}
