const useEstimation = (estimationBlock, setEstimationBlock) => {
  const handleAddSection = () => {
    setEstimationBlock({
      ...estimationBlock,
      estimationData: [
        ...estimationBlock.estimationData,
        {
          selectionName: "",
          total: "",
          items: [
            {
              title: "",
              description: "",
              unit: "",
              quantity: "",
              price: "",
              margin: "",
              total: "",
            },
          ],
        },
      ],
    });
  };

  const handleAddItem = (parentIndex) => {
    let updatedSelection = estimationBlock.estimationData.map((ele, index1) => {
      if (index1 === parentIndex) {
        return {
          ...ele,
          items: [
            ...ele.items,
            {
              title: "",
              description: "",
              unit: "",
              quantity: "",
              price: "",
              margin: "",
              total: "",
            },
          ],
        };
      } else {
        return ele;
      }
    });

    setEstimationBlock({
      ...estimationBlock,
      estimationData: updatedSelection,
    });
  };

  const handleRemoveItem = (parentIndex, childIndex) => {
    let updatedSelection = estimationBlock.estimationData.map((ele, index1) => {
      if (index1 === parentIndex) {
        return {
          ...ele,
          items: ele.items.filter((_, index) => index !== childIndex),
        };
      } else {
        return ele;
      }
    });

    setEstimationBlock({
      ...estimationBlock,
      estimationData: updatedSelection,
    });
  };

  const handleParentTextChange = (e, parentIndex) => {
    const { name, value } = e.target;

    let updatedText = estimationBlock.estimationData.map((ele, index) => {
      if (index === parentIndex) {
        return {
          ...ele,
          [name]: value,
        };
      } else {
        return ele;
      }
    });

    setEstimationBlock({ ...estimationBlock, estimationData: updatedText });
  };

  const handleChildTextChange = (e, parentIndex, childIndex) => {
    const { name, value } = e.target;

    let updatedText = estimationBlock.estimationData.map((ele, index) => {
      if (index === parentIndex) {
        let itemChange = ele.items.map((item, cIndex) => {
          if (cIndex === childIndex) {
            return {
              ...item,
              [name]: value,
            };
          } else {
            return item;
          }
        });

        return {
          ...ele,
          items: itemChange,
        };
      } else {
        return ele;
      }
    });

    setEstimationBlock({ ...estimationBlock, estimationData: updatedText });
  };

  const handleChildNumberChange = (e, parentIndex, childIndex, name) => {
    let updatedText = estimationBlock.estimationData.map((ele, index) => {
      if (index === parentIndex) {
        let itemChange = ele.items.map((item, cIndex) => {
          if (cIndex === childIndex) {
            return {
              ...item,
              [name]: e,
            };
          } else {
            return item;
          }
        });

        return {
          ...ele,
          items: itemChange,
        };
      } else {
        return ele;
      }
    });

    setEstimationBlock({ ...estimationBlock, estimationData: updatedText });
  };

  const countTotal = (quantity, price, margin) => {
    const quantityPrice = quantity * price;
    const marginAmount = (margin / 100) * quantityPrice;
    const total = quantityPrice + marginAmount;

    return total;
  };

  const handleItemCount = (parentIndex, childIndex) => {
    let parentFind = estimationBlock.estimationData.find(
      (_, index) => index === parentIndex
    );

    let childernFind = parentFind.items.find(
      (_, index) => index === childIndex
    );

    const { quantity, price, margin } = childernFind;

    return countTotal(quantity, price, margin);
  };

  const handleTotalCount = (parentIndex) => {
    let parentFind = estimationBlock.estimationData.find(
      (_, index) => index === parentIndex
    );

    return parentFind.items.reduce((acc, cur) => {
      const { quantity, price, margin } = cur;
      let total = countTotal(quantity, price, margin);

      return total + acc;
    }, 0);
  };

  const handleToatalSum = () => {
    let totalSum = 0;

    estimationBlock.estimationData.forEach((item) => {
      item.items.forEach((ele) => {
        totalSum += ele.quantity * ele.price;
      });
    });

    return totalSum;
  };

  const handleMargin = () => {
    let totalMargin = 0;

    estimationBlock.estimationData.forEach((item) => {
      item.items.forEach((ele) => {
        totalMargin += (ele.margin / 100) * (ele.quantity * ele.price);
      });
    });

    return totalMargin;
  };

  return [
    handleAddSection,
    handleAddItem,
    handleRemoveItem,
    handleParentTextChange,
    handleChildTextChange,
    handleChildNumberChange,
    handleItemCount,
    handleTotalCount,
    handleToatalSum,
    handleMargin,
  ];
};

export default useEstimation;
