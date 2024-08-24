import { Drawer as DrawerRoot } from "vaul"

export const Drawer = DrawerRoot.Root as any
export const NestedDrawer = DrawerRoot.NestedRoot as any
export const DrawerTrigger = DrawerRoot.Trigger
export const DrawerTitle = ({ title }: { title: string }) => {
  return <DrawerRoot.Title className="font-bold mb-4">{title}</DrawerRoot.Title>
}
export const DrawerClose = DrawerRoot.Close

export const DrawerContent = ({ children }) => {
  return (
    <>
      <DrawerRoot.Portal>
        <DrawerRoot.Overlay className="fixed inset-0 bg-black/40" />
        <DrawerRoot.Content
          aria-describedby={undefined}
          className="z-50 bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0"
        >
          <div className="p-4 bg-white rounded-t-[10px] flex-1">
            <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
            <div className="">{children}</div>
          </div>
        </DrawerRoot.Content>
      </DrawerRoot.Portal>
    </>
  )
}
