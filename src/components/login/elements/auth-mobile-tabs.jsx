import { Tab } from "@headlessui/react";
import Components from "./auth-json-component";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AuthMobileTabs() {
  const data = {
    content: {
      body: [
        {
          id: 1,
          component: "login",
          title: "Sign In",
        },
        {
          id: 2,
          component: "createAccount",
          title: "Create Account",
        },
      ],
    },
  };

  return (
    <div className="w-full px-2 py-5 md:py-16 sm:px-5">
      <Tab.Group>
        <Tab.Panels className="mt-2">
          {data.content.body.map((posts) => (
            <Tab.Panel key={posts.id} className={classNames("bg-white register-page border", "ring-white")}>
              <Tab.List className="flex items-center justify-center space-x-5">
                {data.content.body.map(({ title, id }) => (
                  <Tab
                    key={id}
                    className={({ selected }) =>
                      classNames(
                        "text-[17px] font-medium uppercase last:text-left my-5",
                        selected ? "text-skin-base underline" : "text-[#a8a8a8]"
                      )
                    }
                  >
                    {title}
                  </Tab>
                ))}
              </Tab.List>
              {Components(posts)}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

export default AuthMobileTabs;
